#!/bin/sh

# -----------------------------------------------------------------------------------
# Script: check-commit-signing.sh
# Purpose: Prevents commits that are not cryptographically signed (GPG or Gitsign).
# This ensures trust and accountability, especially in secure or open source workflows.
#
# Example usage (inside .husky/pre-commit or pre-push):
#   scripts/check-commit-signing.sh || exit 1
# -----------------------------------------------------------------------------------

. "$(dirname "$0")/utils.sh"

echo ""
log_info "Verifying commit signature..."

LAST_COMMIT=$(git rev-parse HEAD)
SIGNATURE_INFO=$(git log --show-signature -1 "$LAST_COMMIT" 2>/dev/null)

if echo "$SIGNATURE_INFO" | grep -qE "Good signature|gitsign: Good signature"; then
  log_success "Commit $LAST_COMMIT is signed and verified."
  exit 0
else
  log_error "Commit $LAST_COMMIT is not signed!"
  log_info "Please sign your commit using GPG or Gitsign before pushing."
  echo "🔗 Refer to: https://docs.github.com/en/authentication/managing-commit-signature-verification"
  exit 1
fi
