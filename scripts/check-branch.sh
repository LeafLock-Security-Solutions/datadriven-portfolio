#!/bin/sh

# -----------------------------------------------------------------------------------
# Script: check-branch.sh
# Purpose: Prevents direct commits or pushes to protected branches like `main`.
# Encourages contributors to use dev, feature, or release branches with Pull Requests.
#
# Example usage (in .husky/pre-commit or pre-push):
#   scripts/check-branch.sh || exit 1
# -----------------------------------------------------------------------------------

. "$(dirname "$0")/utils.sh"

PROTECTED_BRANCHES="main master"
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

if echo "$PROTECTED_BRANCHES" | grep -wq "$CURRENT_BRANCH"; then
  echo ""
  log_error "You are on a protected branch: '$CURRENT_BRANCH'"
  log_info "Direct commits or pushes to this branch are not allowed."
  echo "👉 Please use a feature, dev, or release branch and submit a Pull Request."
  exit 1
else
  log_success "Branch check passed: Working on '$CURRENT_BRANCH'"
  exit 0
fi
