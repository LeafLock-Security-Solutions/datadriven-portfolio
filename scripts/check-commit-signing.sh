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

LAST_COMMIT=$(git rev-parse HEAD)
SIGNATURE_INFO=$(git log --show-signature -1 "$LAST_COMMIT" 2>/dev/null)

# Check for common signature types (GPG or Gitsign)
if echo "$SIGNATURE_INFO" | grep -qE "Good signature|gitsign: Good signature"; then
  echo "${GREEN}✅ Commit $LAST_COMMIT is signed and verified.${RESET}"
  exit 0
else
  echo "${RED}❌ Commit $LAST_COMMIT is not signed!${RESET}"
  echo "${YELLOW}Please sign your commit using GPG or Gitsign before pushing.${RESET}"
  echo "Refer to https://docs.github.com/en/authentication/managing-commit-signature-verification"
  exit 1
fi