#!/bin/sh

# -----------------------------------------------------------------------------------
# Script: check-secrets.sh
# Purpose: Prevents accidental commits of API keys, tokens, passwords, and hardcoded
# absolute file/folder paths.
#
# - Runs Gitleaks via Docker to detect secrets in source
# - Scans staged files for UNIX and Windows-style absolute paths
# - Blocks commit if any issues are found
#
# Example usage (inside .husky/pre-commit):
#   scripts/check-secrets.sh || exit 1
#
# Supports JavaScript/TypeScript, JSON, Markdown, CSS files.
# -----------------------------------------------------------------------------------

RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RESET="\033[0m"

echo "\n🔍 ${YELLOW}Running secret and path scan before commit...${RESET}"

# --- Run Gitleaks via Docker ---
echo "\n🚨 Scanning with Gitleaks (via Docker)..."
docker run --rm \
  -v "$(pwd)":/path \
  zricethezav/gitleaks:latest \
  detect --source="/path" --no-git --redact

GITLEAKS_STATUS=$?

# --- Scan staged files for absolute paths ---
echo "\n🧐 Checking for hardcoded absolute file/folder paths..."

# Get list of staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -v '^node_modules/' | grep -E '\.(js|jsx|ts|tsx|json|md|css)$')

HAS_PATH_ISSUES=0

for FILE in $STAGED_FILES; do
  if [ -f "$FILE" ]; then
    # UNIX paths: /Users/ or /home/
    grep -nE '/Users/|/home/' "$FILE" | while read -r LINE; do
      echo "${RED}❌ [$FILE:${LINE%%:*}] UNIX path detected:${RESET} ${LINE#*:}"
      HAS_PATH_ISSUES=1
    done

    # Windows paths: C:\\Users\\ or D:\\Projects\\
    grep -nE '[A-Z]:\\\\Users\\\\|[A-Z]:\\\\Projects\\\\' "$FILE" | while read -r LINE; do
      echo "${RED}❌ [$FILE:${LINE%%:*}] Windows path detected:${RESET} ${LINE#*:}"
      HAS_PATH_ISSUES=1
    done
  fi
done

# --- Final check ---
if [ "$GITLEAKS_STATUS" -ne 0 ] || [ "$HAS_PATH_ISSUES" -ne 0 ]; then
  echo "\n${RED}❌ Commit blocked due to detected secrets or absolute paths.${RESET}"
  exit 1
else
  echo "\n${GREEN}✅ No secrets or absolute paths found. Proceeding with commit.${RESET}"
  exit 0
fi
