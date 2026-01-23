# Commit Signing Guide

This repository requires all commits to be cryptographically signed to ensure authenticity. Here is a guide to setting up your GPG key.

## 1. Install GPG

- **macOS:** Install via [Homebrew](https://brew.sh/): `brew install gpg`
- **Windows:** Install via [Gpg4win](https://www.gpg4win.org/).
- **Linux:** Install via your package manager: `sudo apt-get install gnupg`

## 2. Generate Your GPG Key

Run the following command and follow the prompts. For a detailed walkthrough, see GitHub's guide on [Generating a new GPG key](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key).

```bash
gpg --full-generate-key
```

**Key recommendations:**

- Key type: RSA and RSA (default) is a good choice.
- Keysize: Use 4096 bits for strong security.
- Email address: This must match the email you use for your GitHub account.

## 3. Add Your GPG Key to GitHub

1. **List your keys** to find your GPG key ID:

   ```bash
   gpg --list-secret-keys --keyid-format=long
   ```

   Copy the key ID (the long string of characters after `rsa4096/`).

2. **Export your public key**:

   ```bash
   gpg --armor --export YOUR_KEY_ID
   ```

3. **Add to GitHub**: Copy the entire output and paste it as a new GPG key in your GitHub settings. For step-by-step instructions, see GitHub's guide on [Adding a GPG key to your GitHub account](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account).

## 4. Configure Git

Tell Git to use your key and sign all commits automatically. For more details, see GitHub's guide on [Telling Git about your signing key](https://docs.github.com/en/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key).

```bash
# Replace YOUR_KEY_ID with the one you copied earlier
git config --global user.signingkey YOUR_KEY_ID
git config --global commit.gpgsign true
```

## 5. Verify Your Setup

Test that signing is working without adding unnecessary commits to your history:

```bash
# Check your Git configuration
git config --global --get user.signingkey
git config --global --get commit.gpgsign

# Test GPG signing (this won't create a commit)
echo "test" | gpg --clearsign
```

If GPG signing works, you should see a signed message. If you get errors, check that your GPG agent is running and your key is accessible.

---

## Signing Unsigned Commits

If you have commits that weren't signed, you'll need to amend or rebase them. **Warning**: These operations rewrite commit history, so coordinate with your team if working on shared branches.

### Sign the Most Recent Commit

If your last commit is unsigned:

```bash
# Amend the last commit with a signature
git commit --amend --no-edit -S
```

### Sign Multiple Recent Commits (Interactive Rebase)

To sign several recent unsigned commits:

```bash
# Start interactive rebase for the last N commits
git rebase -i HEAD~N --exec "git commit --amend --no-edit -S"

# Alternative: rebase back to a specific commit
git rebase -i <commit-hash>^
```

In the interactive rebase editor, change `pick` to `edit` for each commit you want to sign, then for each commit:

```bash
git commit --amend --no-edit -S
git rebase --continue
```

### Important Notes

- **Force push required**: After rewriting history, you'll need to force push: `git push --force-with-lease`
- **Team coordination**: Inform team members as they'll need to reset their local branches
- **Backup first**: Create a backup branch before rewriting history: `git branch backup-branch`

---

## Troubleshooting

**GPG Agent Not Running:**

```bash
# Start GPG agent
gpg-agent --daemon
# Or restart it
gpgconf --kill gpg-agent
gpgconf --launch gpg-agent
```

**Email Mismatch:**
Ensure your Git email matches your GPG key email:

```bash
git config --global user.email "your-email@example.com"
# Check your GPG key email
gpg --list-secret-keys --keyid-format=long
```

**Key Not Found:**

```bash
# List available keys
gpg --list-secret-keys --keyid-format=long
# Set the correct key ID
git config --global user.signingkey YOUR_CORRECT_KEY_ID
```
