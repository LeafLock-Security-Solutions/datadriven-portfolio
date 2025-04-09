#!/bin/sh

# -----------------------------------------------------------------------------------
# Script: check-max-files.sh
# Purpose: Prevents commits with more than a specified number of staged files.
# This encourages focused, atomic commits and discourages lazy bulk changes.
#
# Example usage:
#   scripts/check-max-files.sh || exit 1
# -----------------------------------------------------------------------------------

. "$(dirname "$0")/utils.sh"

MAX_FILES=5

echo ""
log_info "Checking number of files staged for commit..."

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACMR)
FILE_COUNT=$(echo "$STAGED_FILES" | wc -l)

if [ "$FILE_COUNT" -gt "$MAX_FILES" ]; then
  echo ""
  log_error "$FILE_COUNT files are staged (limit is $MAX_FILES)."
  log_info "Staged files:"
  echo "$STAGED_FILES" | sed 's/^/  - /'
  echo ""
  log_error "Too many changes in a single commit can make code reviews and debugging difficult."
  log_info "Please split your work into smaller, logical commits. For example:"
  echo "  - One commit for a refactor"
  echo "  - Another for a bug fix"
  echo "  - One for content updates"
  exit 1
else
  log_success "File count check passed: $FILE_COUNT files staged."
  exit 0
fi
