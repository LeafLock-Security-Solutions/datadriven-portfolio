#!/bin/sh

# -----------------------------------------------------------------------------------
# Script: check-commit-signing.sh
# Purpose: Prevents commits that are not cryptographically signed (e.g., with GPG or gitsign).
#
# This helps enforce trust, accountability, and secure collaboration on open source or
# sensitive projects.
#
# Example usage (inside .husky/pre-commit or pre-push):
#   scripts/check-commit-signing.sh || exit 1
# -----------------------------------------------------------------------------------

RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RESET="\033[0m"

echo "\n🔐 ${YELLOW}Verifying commit signature...${RESET}"

# Check the last (staged) commit
SIGN_STATUS=$(git log -1 --pretty=%G?)
SIGNER_NAME=$(git log -1 --pretty="%GS")
COMMIT_HASH=$(git log -1 --pretty="%H")

if [ "$SIGN_STATUS" = "G" ]; then
  echo "${GREEN}✅ Commit $COMMIT_HASH is signed by: $SIGNER_NAME${RESET}"
  exit 0
else
  echo "${RED}❌ Commit $COMMIT_HASH is not signed!${RESET}"
  echo "\nPlease sign your commit using GPG or a signing tool like gitsign."
  echo "Refer to https://docs.github.com/en/authentication/managing-commit-signature-verification"
  exit 1
fi
