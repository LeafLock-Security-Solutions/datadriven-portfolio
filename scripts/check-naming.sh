#!/bin/sh

# -----------------------------------------------------------------------------------
# Script: check-naming.sh
# Purpose: Enforces strict and consistent naming conventions across the project.
#
# 🔍 What it checks:
#   - All file and folder names follow lowercase kebab-case:
#       ✅ Allowed: `my-component.jsx`, `assets/images`, `config/constants.js`
#       ❌ Disallowed: `MyComponent.jsx`, `Assets/Images`, `My File.js`
#
#   - Markdown documentation files are allowed in UPPER_SNAKE_CASE:
#       ✅ Allowed: `README.md`, `CODE_OF_CONDUCT.md`, `STYLEGUIDE.md`
#       ❌ Disallowed: `ReadMe.md`, `styleguide.MD`, `guide-Doc.md`
#
# 📁 Why this matters:
#   - Prevents naming collisions on case-insensitive file systems (like macOS/Windows)
#   - Makes imports predictable and file scanning reliable in CI/CD and tools
#   - Improves project readability and consistency for all contributors
#
# 📌 Integration:
# This script is intended to be used as part of Husky pre-commit hook:
#   .husky/pre-commit
#     └── scripts/check-naming.sh || exit 1
#
# 🛠 If you encounter naming errors:
#   - Rename the file/folder to use valid kebab-case (e.g., `my-folder/file-name.js`)
#   - Keep markdown files for meta documentation in UPPER_SNAKE_CASE (e.g., `README.md`)
#
# Compatible with: Unix/macOS/Linux shells with `git`, `grep`, and standard POSIX tools.
# -----------------------------------------------------------------------------------

RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RESET="\033[0m"

INVALID_NAMES=()

# Regex for kebab-case / lowercase files and folders
VALID_LOWERCASE_PATTERN="^[a-z0-9._-]+$"
# Regex for allowed uppercase markdown files
VALID_MD_PATTERN="^[A-Z0-9_]+\.md$"

STAGED_PATHS=$(git diff --cached --name-only --diff-filter=ACMR)

for path in $STAGED_PATHS; do
  # Split path into folders and filename
  IFS='/' read -ra PARTS <<< "$path"
  for part in "${PARTS[@]}"; do
    # If markdown file, validate with markdown pattern
    if echo "$part" | grep -qE '\.md$'; then
      if ! echo "$part" | grep -qE "$VALID_MD_PATTERN"; then
        INVALID_NAMES+=("$path")
        break
      fi
    # Otherwise, apply lowercase pattern
    elif ! echo "$part" | grep -qE "$VALID_LOWERCASE_PATTERN"; then
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
  echo "\n${YELLOW}✅ Use lowercase-kebab-case (a-z, 0-9, -, _) for files and folders."
  echo "📝 Allowed exception: UPPER_SNAKE_CASE.md for markdown meta files (e.g., README.md)${RESET}"
  exit 1
else
  echo "\n${GREEN}✅ All file and folder names follow naming conventions.${RESET}"
  exit 0
fi
