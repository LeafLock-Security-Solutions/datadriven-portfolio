# 📌 Versioning Guide

This project follows [Semantic Versioning 2.0.0](https://semver.org/).

---

## 🔢 Format: `MAJOR.MINOR.PATCH`

Each version is structured as:

- **MAJOR**: Breaking changes, significant redesigns or backend integrations.
- **MINOR**: New features added that are backwards-compatible.
- **PATCH**: Bug fixes, documentation updates, or small improvements.

### 🧠 Examples:

| Version | Description |
|---------|-------------|
| `1.0.0` | First public release |
| `1.1.0` | New section added to portfolio layout |
| `1.1.1` | Fixed UI bug in dark mode |
| `2.0.0` | Introduced backend customization (breaking change) |

---

## 🏷️ Releasing a New Version

When you're ready to release:

1. Update the `CHANGELOG.md` with a summary of what's changed.
2. Commit all changes to `main` or your release branch.
3. Tag the commit with Git:

   ```bash
   git tag -a vX.Y.Z -m "Your release message"
   git push origin vX.Y.Z
   ```

4. Create a GitHub Release from the tag (optional, but recommended for visibility).

---

## 🛠️ Current Version Status

| Version | Status |
|---------|--------|
| `v0.1.0` | Private development phase |
| `v1.0.0` *(planned)* | First open-source release with JSON-based customization |

---

## 📚 Additional Resources

- [Semantic Versioning 2.0.0](https://semver.org/)
- [GitHub: About Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)
- [Conventional Commits](https://www.conventionalcommits.org/) *(optional, for consistent commit messages)*

---

## 🔮 Future Considerations

As the project evolves, we may:
- Automate versioning and changelog updates using tools like `release-please`, `standard-version`, or GitHub Actions
- Use release branches for major updates
- Maintain older versions for compatibility if needed

---
