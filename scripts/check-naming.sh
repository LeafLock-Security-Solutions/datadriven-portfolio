#!/bin/sh

# -----------------------------------------------------------------------------------
# Script: check-naming.sh
# Purpose: Enforces consistent file and folder naming conventions.
#
# ✅ Enforces:
# - kebab-case for regular files/folders (lowercase a-z, 0-9, -, _, .)
# - UPPER_SNAKE_CASE.md for meta markdown files (e.g., README.md, STYLEGUIDE.md)
#
# ✅ Allows:
# - Standard tooling files: Dockerfile, Makefile
# - Dotfiles: .env, .gitignore, etc.
#
# ❌ Flags:
# - Uppercase letters in filenames unless in meta-markdown form
# - Invalid characters or special cases
#
# Example usage (inside .husky/pre-commit):
#   scripts/check-naming.sh || exit 1
# -----------------------------------------------------------------------------------

. "$(dirname "$0")/utils.sh"

INVALID_NAMES=()

# Exact filenames to allow as exceptions
ALLOWED_NAMES=(
  "Dockerfile"
  "Makefile"
)

# Partial patterns allowed (config and dotfiles)
ALLOWED_PATTERNS=(
  "^\\."             # .env, .gitignore, etc.
  ".*\\.config\\.js" # tailwind.config.js
  ".*\\.rc"          # .eslintrc, .prettierrc
)

# Regex patterns for naming conventions
VALID_PATTERN="^[a-z0-9._-]+$"
MARKDOWN_PATTERN="^[A-Z0-9_]+\\.md$"

STAGED_PATHS=$(git diff --cached --name-only --diff-filter=ACMR)

for path in $STAGED_PATHS; do
  IFS='/' read -ra PARTS <<< "$path"
  for part in "${PARTS[@]}"; do
    # Allowed exact names
    if printf '%s\n' "${ALLOWED_NAMES[@]}" | grep -qx "$part"; then
      continue
    fi

    # Allowed pattern-based matches
    for pattern in "${ALLOWED_PATTERNS[@]}"; do
      echo "$part" | grep -qE "$pattern" && continue 2
    done

    # Allowed UPPER_SNAKE_CASE markdowns
    echo "$part" | grep -qE "$MARKDOWN_PATTERN" && continue

    # Must match valid pattern
    echo "$part" | grep -qE "$VALID_PATTERN" || {
      INVALID_NAMES+=("$path")
      break
    }
  done
done

if [ ${#INVALID_NAMES[@]} -gt 0 ]; then
  echo ""
  log_error "Invalid file or folder names detected:"
  for name in "${INVALID_NAMES[@]}"; do
    echo " - $name"
  done
  echo ""
  log_info "✅ Use lowercase-kebab-case (a-z, 0-9, -, _, .) for files and folders."
  log_info "📝 Allowed exception: UPPER_SNAKE_CASE.md for markdown meta files (e.g., README.md)"
  exit 1
else
  echo ""
  log_success "All file and folder names follow naming conventions."
  exit 0
fi
