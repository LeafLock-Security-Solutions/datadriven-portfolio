#!/bin/sh

# -----------------------------------------------------------------------------------
# Script: check-naming.sh
# Purpose: Enforces consistent file and folder naming conventions.
#
# ✅ Enforces:
# - kebab-case for regular files/folders (lowercase a-z, 0-9, -, _, .)
# - PascalCase for React components (e.g., ThemeProvider.jsx)
# - useXyz.js naming for React hooks (e.g., useTheme.js)
# - UPPER_SNAKE_CASE.md for meta markdown files (e.g., README.md, STYLEGUIDE.md)
#
# ✅ Allows:
# - Standard tooling files: Dockerfile, Makefile
# - Dotfiles: .env, .gitignore, etc.
#
# ❌ Flags:
# - Uppercase letters in filenames unless in allowed exceptions
# - Mixed casing or unconventional names (e.g., My_file.js, myFile.js)
#
# Example usage (inside .husky/pre-commit):
#   scripts/check-naming.sh || exit 1
# -----------------------------------------------------------------------------------

. "$(dirname "$0")/utils.sh"

VIOLATIONS=()

# Allowed filenames (explicit)
EXACT_ALLOWED_FILES=(
  "Dockerfile"
  "Makefile"
)

# Allowed file patterns
REGEX_ALLOWED_PATTERNS=(
  "^\\."              # Dotfiles like .env, .gitignore
  ".*\\.config\\.js"  # *.config.js
  ".*\\.rc"           # .eslintrc, .prettierrc
)

# Allowed filename structures
REGEX_VALID_KEBAB_CASE="^[a-z0-9._-]+$"
REGEX_VALID_MARKDOWN="^[A-Z0-9_]+\\.md$"
REGEX_VALID_REACT_COMPONENT="^[A-Z][a-zA-Z0-9]*\\.(jsx?|tsx?)$"
REGEX_VALID_HOOK="^use[A-Z][a-zA-Z0-9]*\\.js$"

# Get list of staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACMR)

for file in $STAGED_FILES; do
  IFS='/' read -ra PATH_PARTS <<< "$file"
  for part in "${PATH_PARTS[@]}"; do
    # Allow exact matches
    if printf '%s\n' "${EXACT_ALLOWED_FILES[@]}" | grep -qx "$part"; then
      continue
    fi

    # Allow allowed pattern matches (e.g., dotfiles)
    for pattern in "${REGEX_ALLOWED_PATTERNS[@]}"; do
      echo "$part" | grep -qE "$pattern" && continue 2
    done

    # Allow Markdown meta files in UPPER_SNAKE_CASE
    echo "$part" | grep -qE "$REGEX_VALID_MARKDOWN" && continue

    # Allow PascalCase React component files
    echo "$part" | grep -qE "$REGEX_VALID_REACT_COMPONENT" && continue

    # Allow useXyz.js React hook files
    echo "$part" | grep -qE "$REGEX_VALID_HOOK" && continue

    # Enforce kebab-case as default
    echo "$part" | grep -qE "$REGEX_VALID_KEBAB_CASE" || {
      VIOLATIONS+=("$file")
      break
    }
  done
done

# Final verdict
if [ ${#VIOLATIONS[@]} -gt 0 ]; then
  echo ""
  log_error "🚫 Invalid file or folder names detected:"
  for name in "${VIOLATIONS[@]}"; do
    echo " - $name"
  done
  echo ""
  log_info "🔧 Naming Rules:"
  log_info " • Use kebab-case for all regular files and folders (e.g., my-component.js)"
  log_info " • Use PascalCase for React components (e.g., ThemeProvider.jsx)"
  log_info " • Use useCamelCase for hooks (e.g., useTheme.js)"
  log_info " • Use UPPER_SNAKE_CASE.md for markdown files (e.g., README.md)"
  log_info " • Exceptions: Dockerfile, Makefile, .env, .gitignore, .eslintrc, etc."
  exit 1
else
  echo ""
  log_success "✅ All file and folder names follow naming conventions."
  exit 0
fi
