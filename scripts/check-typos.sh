#!/bin/sh

# -----------------------------------------------------------------------------------
# Script: check-typos.sh
# Purpose: Uses cspell to catch spelling mistakes in code, comments, and markdown.
#
# Blocks commit if any spelling issues are found in staged files.
#
# Example usage (inside .husky/pre-commit):
#   scripts/check-typos.sh || exit 1
# -----------------------------------------------------------------------------------

. "$(dirname "$0")/utils.sh"

# Filter staged files with common source or doc extensions
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACMR \
  | grep -v '^node_modules/' \
  | grep -E '\.(js|jsx|ts|tsx|json|md|css|html)$')

if [ -z "$STAGED_FILES" ]; then
  echo ""
  log_info "No relevant files staged for typo check."
  exit 0
fi

echo ""
log_info "🔍 Checking spelling and typos with cspell..."

# Run cspell with useful flags
npx cspell lint $STAGED_FILES \
  --no-progress \
  --color \
  --show-suggestions

STATUS=$?

if [ "$STATUS" -ne 0 ]; then
  echo ""
  log_error "Commit blocked due to spelling/typo issues."
  log_info "Please fix the above typos or add valid words to .cspell.json if needed."
  exit 1
else
  echo ""
  log_success "No spelling issues found."
  exit 0
fi
