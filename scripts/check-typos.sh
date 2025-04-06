#!/bin/sh

# -----------------------------------------------------------------------------------
# Script: check-typos.sh
# Purpose: Runs cspell to check for typos in code, comments, docstrings,
# Markdown, file/folder names, and more.
#
# Example usage (inside .husky/pre-commit):
#   scripts/check-typos.sh || exit 1
#
# Behavior: This script fails the commit if any typos are found.
# -----------------------------------------------------------------------------------

RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RESET="\033[0m"

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACMR | grep -v '^node_modules/' | grep -E '\.(js|jsx|ts|tsx|json|md|css|html)$')

if [ -z "$STAGED_FILES" ]; then
  echo "\n${YELLOW}No relevant files staged for typo check.${RESET}"
  exit 0
fi

echo "\n🔍 ${YELLOW}Checking spelling and typos with cspell...${RESET}"

# Run cspell strictly
npx cspell lint $STAGED_FILES --no-progress --color --show-suggestions
STATUS=$?

if [ "$STATUS" -ne 0 ]; then
  echo "\n${RED}❌ Commit blocked due to spelling/typo issues.${RESET}"
  echo "${YELLOW}Please fix the above typos or add valid words to .cspell.json if needed.${RESET}"
  exit 1
else
  echo "\n${GREEN}✅ No spelling issues found.${RESET}"
  exit 0
fi
