#!/bin/sh

# -----------------------------------------------------------------------------------
# Script: check-max-files.sh
# Purpose: Prevents commits with more than a specified number of staged files.
# This encourages focused, atomic commits and discourages lazy bulk changes.
#
# Example usage (inside .husky/pre-commit):
#   scripts/check-max-files.sh || exit 1
#
# Configuration:
# - MAX_FILES: Maximum allowed staged files per commit (default: 5)
# -----------------------------------------------------------------------------------

RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RESET="\033[0m"

MAX_FILES=5

echo "\n📦 ${YELLOW}Checking number of files staged for commit...${RESET}"

# Count number of staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM)
FILE_COUNT=$(echo "$STAGED_FILES" | wc -l)

if [ "$FILE_COUNT" -gt "$MAX_FILES" ]; then
  echo "\n${RED}❌ Commit blocked: $FILE_COUNT files are staged (limit is $MAX_FILES).${RESET}"
  echo "${YELLOW}Staged files:${RESET}"
  echo "$STAGED_FILES" | sed 's/^/  - /'
  echo "\n${RED}Too many changes in a single commit can make code reviews and debugging difficult.${RESET}"
  echo "${YELLOW}Please split your work into smaller, logical commits. For example:${RESET}"
  echo "  - One commit for a refactor"
  echo "  - Another for a bug fix"
  echo "  - One for content updates"
  exit 1
else
  echo "${GREEN}✅ File count check passed: $FILE_COUNT files staged.${RESET}"
  exit 0
fi