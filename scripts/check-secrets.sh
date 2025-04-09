#!/bin/sh

# -----------------------------------------------------------------------------------
# Script: check-secrets.sh
# Purpose: Prevents accidental commits of API keys, tokens, passwords,
# or hardcoded absolute file/folder paths.
#
# - Runs Gitleaks via Docker
# - Scans for UNIX and Windows-style absolute paths
# - Blocks commit if anything suspicious is found
#
# Example usage (inside .husky/pre-commit):
#   scripts/check-secrets.sh || exit 1
# -----------------------------------------------------------------------------------

. "$(dirname "$0")/utils.sh"

echo ""
log_info "🔍 Running secret and path scan before commit..."

# --- Run Gitleaks via Docker ---
log_info "🚨 Scanning with Gitleaks (via Docker)..."
docker run --rm \
  -v "$(pwd)":/path \
  zricethezav/gitleaks:latest \
  detect --source="/path" --no-git --redact

GITLEAKS_STATUS=$?

# --- Scan for hardcoded absolute paths ---
log_info "🧠 Checking for hardcoded absolute file/folder paths..."

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -v '^node_modules/' | grep -E '\.(js|jsx|ts|tsx|json|md|css)$')

HAS_PATH_ISSUES=0

for FILE in $STAGED_FILES; do
  [ -f "$FILE" ] || continue

  # Check UNIX absolute paths
  grep -nE '/Users/|/home/' "$FILE" | while read -r LINE; do
    log_error "[$FILE:${LINE%%:*}] UNIX path detected: ${LINE#*:}"
    HAS_PATH_ISSUES=1
  done

  # Check Windows absolute paths
  grep -nE '[A-Z]:\\\\Users\\\\|[A-Z]:\\\\Projects\\\\' "$FILE" | while read -r LINE; do
    log_error "[$FILE:${LINE%%:*}] Windows path detected: ${LINE#*:}"
    HAS_PATH_ISSUES=1
  done
done

# --- Final check ---
if [ "$GITLEAKS_STATUS" -ne 0 ] || [ "$HAS_PATH_ISSUES" -ne 0 ]; then
  echo ""
  log_error "Commit blocked due to detected secrets or absolute paths."
  exit 1
else
  echo ""
  log_success "No secrets or absolute paths found. Proceeding with commit."
  exit 0
fi
