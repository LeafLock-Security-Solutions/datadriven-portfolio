#!/bin/sh

# -----------------------------------------------------------------------------------
# Script: check-large-files.sh
# Purpose: Blocks commits that include files larger than a specified size (default: 1MB).
# Runs as a Husky Git hook. Can be triggered from pre-commit or pre-push.
# 
# Example usage (inside .husky/pre-commit or pre-push):
#   scripts/check-large-files.sh || exit 1
#
# This script scans all staged files (excluding node_modules), checks their size,
# and blocks the commit if any file is larger than the specified threshold.
# -----------------------------------------------------------------------------------

RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RESET="\033[0m"

MAX_SIZE=1000000 # 1MB

echo "\n📦 ${YELLOW}Checking for large files in staged changes...${RESET}"

FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -v '^node_modules/')

HAS_LARGE=0

for FILE in $FILES; do
  if [ -f "$FILE" ]; then
    SIZE=$(wc -c <"$FILE")
    if [ "$SIZE" -gt "$MAX_SIZE" ]; then
      echo "${RED}❌ $FILE exceeds 1MB (${SIZE} bytes).${RESET}"
      HAS_LARGE=1
    fi
  fi
done

if [ "$HAS_LARGE" -ne 0 ]; then
  echo "\n${RED}❌ Commit blocked: one or more large files detected.${RESET}"
  exit 1
else
  echo "\n${GREEN}✅ No large files found in staged changes.${RESET}"
  exit 0
fi
