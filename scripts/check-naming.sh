#!/bin/sh

# -----------------------------------------------------------------------------------
# Script: check-naming.sh
# Purpose: Enforces consistent naming conventions for files and folders.
#
# Example usage (inside .husky/pre-commit):
#   scripts/check-naming.sh || exit 1
#
# Default Rules:
# - Files: kebab-case, no uppercase, no spaces, no special chars
# - Folders: same as files
#
# You can adjust patterns to enforce camelCase, PascalCase, etc. if needed.
# -----------------------------------------------------------------------------------

RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RESET="\033[0m"

INVALID_NAMES=()

# Regex pattern for allowed file/folder names (kebab-case)
VALID_PATTERN="^[a-z0-9._-]+$"

STAGED_PATHS=$(git diff --cached --name-only --diff-filter=ACMR)

for path in $STAGED_PATHS; do
  # Split path into folders and file
  IFS='/' read -ra PARTS <<< "$path"
  for part in "${PARTS[@]}"; do
    if ! echo "$part" | grep -qE "$VALID_PATTERN"; then
      INVALID_NAMES+=("$path")
      break
    fi
  done
done

if [ ${#INVALID_NAMES[@]} -gt 0 ]; then
  echo "\n${RED}❌ Invalid file or folder names detected:${RESET}"
  for name in "${INVALID_NAMES[@]}"; do
    echo " - $name"
  done
  echo "\n${YELLOW}Use lowercase kebab-case (a-z, 0-9, -, _, .) for files and folders.${RESET}"
  exit 1
else
  echo "\n${GREEN}✅ All file and folder names follow naming conventions.${RESET}"
  exit 0
fi
