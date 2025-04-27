#!/bin/sh

# -----------------------------------------------------------------------------------
# Script: check-secrets.sh
# Purpose: Prevents accidental commits of API keys, tokens, passwords,
# or hardcoded absolute file/folder paths.
#
# - Runs Gitleaks via Docker on all staged changes at once
# - Scans for UNIX and Windows-style absolute paths
# - Blocks commit if anything suspicious is found
#
# Example usage (inside .husky/pre-commit):
#   scripts/check-secrets.sh || exit 1
# -----------------------------------------------------------------------------------

set -euo pipefail
set +u
. "$(dirname "$0")/utils.sh"
set -u

echo ""
log_info "Running secret and path scan before commit..."

# 1) collect staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM \
  | grep -Ev '^node_modules/' \
  | grep -E '\.(js|jsx|ts|tsx|json|md|css)$' || true)

if [ -n "$STAGED_FILES" ]; then
  FILE_COUNT=$(printf '%s
' "$STAGED_FILES" | grep -cve '^$')
  log_info "Scanning $FILE_COUNT staged file(s) with Gitleaks protect..."

  REPORT_JSON=".gitleaks-report.json"
  OUTPUT_LOG=".gitleaks-output.log"

  # Run Gitleaks in protect mode to scan all staged changes in one go
  if ! docker run --rm -i \
        -v "$(pwd)":/repo \
        -w /repo \
        zricethezav/gitleaks:latest \
        protect \
          --staged \
          --config=".gitleaks.toml" \
          --report-format=json \
          --report-path="$REPORT_JSON" \
          --verbose 2>&1 | tee "$OUTPUT_LOG"; then
    log_error "Gitleaks found potential leaks in staged changes."
    echo ""
    if [ -f "$REPORT_JSON" ]; then
      COUNT=$(jq length "$REPORT_JSON")
      log_info "Total leaks detected: $COUNT"
      log_info "Leak details:"
      jq -r '.[] | "[\(.File):\(.StartLine)] \(.Description)"' "$REPORT_JSON"
      log_info "Full JSON report: $REPORT_JSON"
    else
      log_error "No JSON report—scan may have failed!"
    fi
    echo ""
    log_error "Commit aborted due to detected secrets."
    exit 1
  fi

  # Cleanup report and output when no leaks found
  rm -f "$REPORT_JSON" "$OUTPUT_LOG"
  log_success "No secrets found in staged changes."
else
  log_info "No staged files to scan."
fi

# 2) absolute paths scan
log_info "Checking for hardcoded absolute file/folder paths..."
FAIL_PATH=0
for f in $STAGED_FILES; do
  [ -f "$f" ] || continue

  # UNIX-style paths
  if grep -nE '/Users/|/home/' "$f"; then
    FAIL_PATH=1
  fi

  # Windows-style paths
  if grep -nE '[A-Z]:\\Users\\|[A-Z]:\\Projects\\' "$f"; then
    FAIL_PATH=1
  fi
done

if [ "$FAIL_PATH" -ne 0 ]; then
  echo ""
  log_error "Commit blocked: hardcoded absolute paths detected."
  log_info "Fix any absolute file paths shown above."
  exit 1
fi

echo ""
log_success "No secrets or absolute paths found. Safe to commit!"
exit 0
