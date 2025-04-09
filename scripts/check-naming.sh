#!/bin/sh

# ------------------------------------------------------------------------------
# Script: check-naming.sh
# Purpose: Enforces consistent file and folder naming conventions.
#
# ✅ Enforces:
# - kebab-case for regular files/folders (lowercase a-z, 0-9, -, _, .)
# - UPPER_SNAKE_CASE.md for meta markdown files (e.g., README.md, STYLEGUIDE.md)
#
# ❌ Flags:
# - Uppercase letters in filenames unless in meta-markdown form
# - Invalid characters
#
# ✅ Allows:
# - Standard tooling files: Dockerfile, Makefile
# - Dotfiles: .env, .gitignore, etc.
#
# Example usage (in .husky/pre-commit):
#   scripts/check-naming.sh || exit 1
# ------------------------------------------------------------------------------

RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RESET="\033[0m"

INVALID_NAMES=()

# Allowed exact filenames (case-sensitive)
ALLOWED_NAMES=(
  "Dockerfile"
  "Makefile"
)

# Allowed extensions and dotfiles (partial patterns)
ALLOWED_PATTERNS=(
  "^\\."             # dotfiles like .env, .gitignore
  ".*\\.config\\.js" # config files like tailwind.config.js
  ".*\\.rc"          # .eslintrc, .prettierrc
)

# Kebab-case pattern for general validation
VALID_PATTERN="^[a-z0-9._-]+$"
MARKDOWN_PATTERN="^[A-Z0-9_]+\\.md$"

# Get staged paths
STAGED_PATHS=$(git diff --cached --name-only --diff-filter=ACMR)

for path in $STAGED_PATHS; do
  IFS='/' read -ra PARTS <<< "$path"
  for part in "${PARTS[@]}"; do
    # Allow known names
    if printf '%s\n' "${ALLOWED_NAMES[@]}" | grep -qx "$part"; then
      continue
    fi

    # Allow matching patterns
    SKIP=0
    for pattern in "${ALLOWED_PATTERNS[@]}"; do
      echo "$part" | grep -qE "$pattern" && SKIP=1 && break
    done
    [ "$SKIP" -eq 1 ] && continue

    # Allow UPPER_SNAKE_CASE.md for meta markdown
    echo "$part" | grep -qE "$MARKDOWN_PATTERN" && continue

    # Validate against kebab-case fallback``
    echo "$part" | grep -qE "$VALID_PATTERN" || {
      INVALID_NAMES+=("$path")
      break
    }
  done
done

# Output result
if [ ${#INVALID_NAMES[@]} -gt 0 ]; then
  echo "\n${RED}❌ Invalid file or folder names detected:${RESET}"
  for name in "${INVALID_NAMES[@]}"; do
    echo " - $name"
  done
  echo "\n${YELLOW}✅ Use lowercase-kebab-case (a-z, 0-9, -, _, .) for files and folders."
  echo "📝 Allowed exception: UPPER_SNAKE_CASE.md for markdown meta files (e.g., README.md)${RESET}"
  exit 1
else
  echo "\n${GREEN}✅ All file and folder names follow naming conventions.${RESET}"
  exit 0
fi
