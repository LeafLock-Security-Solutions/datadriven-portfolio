# Commit Signing Guide

## Why Sign Your Commits?

### What is Commit Signing?

Commit signing is a process that cryptographically verifies that a commit was made by an authorized contributor. This ensures that code changes in your repository come from legitimate sources.

### Why is Commit Signing Important?

- **Authenticity**: Prevents impersonation by ensuring commits come from verified contributors.
- **Security**: Protects against supply chain attacks where malicious actors insert unauthorized code.
- **Trust**: Builds confidence among team members and project maintainers.
- **Compliance**: Required for some organizations and open-source projects following security best practices.

### Advantages of Signed Commits

- Ensures authorship integrity
- Helps prevent unauthorized code injection
- Required by some security-conscious projects
- Useful in compliance-driven workflows

> **Note**: This project supports both GPG and Gitsign for commit signing. Choose the method that works best for your workflow.

---

## How to Set Up Commit Signing with Sigstore (gitsign)

We will use **Sigstore's gitsign** for keyless commit signing. This method does not require managing long-term keys and ensures that all commits in all repositories are automatically signed.

### Gitsign Installation Guide

Gitsign does not have a single universal installation command for all systems. The recommended installation approach is to download the appropriate binary or package from the official [Gitsign Releases](https://github.com/sigstore/gitsign/releases) page.

### Identifying Your System

Before installation, identify your **Operating System** and **System Architecture**.

#### Linux and macOS

Use the following command to determine your architecture:

```sh
uname -sm
```

Expected results:

- `Linux x86_64` → `linux_amd64`
- `Linux aarch64` → `linux_arm64`
- `Darwin x86_64` → `darwin_amd64`
- `Darwin arm64` (Apple Silicon) → `darwin_arm64`

To verify on macOS with more detail:

```sh
uname -m
# or
arch
```

If the result is `arm64`, you're on an Apple Silicon Mac. If it's `x86_64`, you're on an Intel Mac.

#### Windows

To determine architecture on Windows:

##### Using PowerShell:

```powershell
echo $env:PROCESSOR_ARCHITECTURE
```

Possible outputs:

- `AMD64` → 64-bit (x86_64)
- `ARM64` → ARM-based systems
- `x86` → 32-bit (not recommended for Gitsign)

##### Using Command Prompt:

```cmd
wmic os get osarchitecture
```

### Windows Installation

Download the appropriate `.exe` file based on your architecture.

#### Command Prompt:

```cmd
curl -LO https://github.com/sigstore/gitsign/releases/latest/download/gitsign_<VERSION>_windows_amd64.exe
```

#### PowerShell:

```powershell
Invoke-WebRequest -Uri "https://github.com/sigstore/gitsign/releases/latest/download/gitsign_<VERSION>_windows_amd64.exe" -OutFile "gitsign.exe"
```

Move `gitsign.exe` to a directory that is part of your system `PATH`, allowing you to run it from any terminal.

#### Common folder options:

- `C:\Program Files\Gitsign\` (create this directory manually)
- `C:\Windows\System32\` (requires admin rights)

#### To add Gitsign to your PATH:

1. Press `Win + S` and search for **Environment Variables**, then select **Edit the system environment variables**.
2. In the **System Properties** window, click the **Environment Variables** button.
3. Under **System variables**, scroll and select the `Path` variable. Click **Edit**.
4. In the new window, click **New** and enter the full path where `gitsign.exe` is located, such as `C:\Program Files\Gitsign`.
5. Click **OK** on all dialogs to save.
6. Restart any open terminal windows (Command Prompt or PowerShell).

You can now run `gitsign` from any terminal window globally.

### Linux Installation

Download the correct installer based on your package manager:

```sh
# Debian-based
sudo dpkg -i gitsign_<VERSION>_linux_amd64.deb

# RHEL-based
sudo rpm -i gitsign_<VERSION>_linux_amd64.rpm

# Alpine Linux
sudo apk add --allow-untrusted gitsign_<VERSION>_linux_amd64.apk
```

#### Or run the binary directly:

```sh
curl -LO https://github.com/sigstore/gitsign/releases/latest/download/gitsign_<VERSION>_linux_amd64
chmod +x gitsign_<VERSION>_linux_amd64
sudo mv gitsign_<VERSION>_linux_amd64 /usr/local/bin/gitsign
```

### macOS Installation

#### Option 1: Homebrew (Recommended if available)

```sh
brew install gitsign
```

If the tap or package isn't available, add the custom tap first:

```sh
brew tap sigstore/tap
brew install gitsign
```

If installation still fails, use manual installation.

#### Option 2: Manual Installation

```sh
curl -LO https://github.com/sigstore/gitsign/releases/latest/download/gitsign_<VERSION>_darwin_arm64
chmod +x gitsign_<VERSION>_darwin_arm64
sudo mv gitsign_<VERSION>_darwin_arm64 /usr/local/bin/gitsign
```

Replace `darwin_arm64` with `darwin_amd64` for Intel Macs.

### Configuring Commit Signing with Gitsign

### Verifying Gitsign Installation

After installing Gitsign, you can verify the installation by running:

```sh
gitsign --version
```

You should see the installed version number printed in the terminal. If this command does not work, ensure that `gitsign` is properly added to your system `PATH`.

After installation, configure Git to use Gitsign:

```sh
git config --global commit.gpgsign true  # Sign all commits
git config --global tag.gpgsign true     # Sign all tags
git config --global gpg.x509.program gitsign  # Use Gitsign for signing
git config --global gpg.format x509      # Gitsign expects x509 args
```

### Notes

- This version placeholder (`<VERSION>`) applies to all installation commands in the Gitsign Installation Guide section under **How to Set Up Commit Signing with Sigstore (gitsign)**. Replace it with the appropriate release version (e.g., `v0.12.0`) or use the `latest` keyword in download URLs.
- Always refer to the [Gitsign Releases](https://github.com/sigstore/gitsign/releases) page for updated versions and checksums.

---

## Verifying Signed Commits

To verify commit signatures:

```sh
git log --show-signature -1
```

Git will display signature verification if everything is set up correctly.

---

## Troubleshooting

### Git Says "GPG Failed to Sign the Data"

- Ensure `gitsign` is correctly installed and configured.
- Run `git config --global commit.gpgsign true` again.

### GitHub Shows "Unverified" for My Signed Commit

This usually occurs because **GitHub does not trust Sigstore’s root certificate authority (CA)** by default. Even though your commit is correctly signed, GitHub may mark it as "Unverified."

To verify your commit manually, you can use the following command:

```sh
gitsign verify \
  --certificate-identity="<your-identity@example.com>" \
  --certificate-oidc-issuer="https://github.com/login/oauth" \
  HEAD
```

Replace `<your-identity@example.com>` with your actual identity.

This command checks the authenticity of the commit using the Sigstore certificate.

If the commit is valid, you will see a successful verification message in the terminal.

---

## Reference Documentation

For more details on keyless commit signing with Sigstore, check the official documentation:  
[Sigstore gitsign Documentation](https://docs.sigstore.dev/cosign/signing/gitsign/)

---

## Signing Previous Unsigned Commits

If you have already made commits without signing them, you can retroactively sign those commits using Git's interactive rebase feature. Please note that this process rewrites commit history, so it is recommended only for commits that haven't been pushed to a shared repository (or if you are confident all collaborators are informed).

### Steps to Sign Previous Commits

1. Start an interactive rebase:

```sh
git rebase -i HEAD~N
```

Replace `N` with the number of past commits you want to sign.

2. In the interactive editor, change `pick` to `edit` for each commit you want to sign.

3. For each commit, run:

```sh
git commit --amend --no-edit -S
```

This command amends the commit and adds your signature.

4. Continue the rebase:

```sh
git rebase --continue
```

Repeat the signing process for each commit marked for edit.

For a full reference, see the Hyperledger Indy documentation:  
[How to Sign Previous Commits](https://hyperledger-indy.readthedocs.io/projects/sdk/en/latest/docs/contributors/signing-commits.html#how-to-sign-previous-commits)

---

## Conclusion

This guide is intended for contributors to this project. Please ensure your commits are signed using Gitsign to maintain the security and authenticity of the codebase. Commit signing helps us establish trust and prevent unauthorized code changes.

If you have questions or run into issues, refer to the troubleshooting section or contact the maintainers.
