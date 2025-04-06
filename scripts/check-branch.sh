#!/bin/sh

# -----------------------------------------------------------------------------------
# Script: check-branch.sh
# Purpose: Prevents direct commits or pushes to protected branches like `main`.
#
# This encourages the use of Pull Requests from feature, dev, or release branches.
#
# Example usage (inside .husky/pre-commit or pre-push):
#   scripts/check-branch.sh || exit 1
# -----------------------------------------------------------------------------------

RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RESET="\033[0m"

# Define protected branches
PROTECTED_BRANCHES="main master"

# Get current branch name
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Check if current branch is protected
if echo "$PROTECTED_BRANCHES" | grep -wq "$CURRENT_BRANCH"; then
  echo "\n${RED}❌ You are on a protected branch: '$CURRENT_BRANCH'${RESET}"
  echo "${YELLOW}Direct commits or pushes to this branch are not allowed.${RESET}"
  echo "Please use a feature, dev, or release branch and submit a Pull Request."
  exit 1
else
  echo "${GREEN}✅ Branch check passed: Working on '$CURRENT_BRANCH'${RESET}"
  exit 0
fi