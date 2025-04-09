#!/bin/sh

# -----------------------------------------------------------------------------------
# Script: check-large-files.sh
# Purpose: Blocks commits that include files larger than a specified size (default: 1MB).
# Runs as a Husky Git hook. Can be triggered from pre-commit or pre-push.
#
# Example usage:
#   scripts/check-large-files.sh || exit 1
# -----------------------------------------------------------------------------------

. "$(dirname "$0")/utils.sh"

MAX_SIZE=1000000 # 1MB

echo ""
log_info "Checking for large files in staged changes..."

FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -v '^node_modules/')

HAS_LARGE=0

for FILE in $FILES; do
  if [ -f "$FILE" ]; then
    SIZE=$(wc -c <"$FILE")
    if [ "$SIZE" -gt "$MAX_SIZE" ]; then
      log_error "$FILE exceeds 1MB (${SIZE} bytes)."
      HAS_LARGE=1
    fi
  fi
done

if [ "$HAS_LARGE" -ne 0 ]; then
  echo ""
  log_error "Commit blocked: one or more large files detected."
  exit 1
else
  echo ""
  log_success "No large files found in staged changes."
  exit 0
fi
