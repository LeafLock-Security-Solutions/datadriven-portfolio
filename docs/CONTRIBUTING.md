# Contribution Guidelines

## Overview

This document outlines the contribution process for this project, including branch creation strategy, pull request (PR) guidelines, commit message best practices, and general contribution standards. By following these guidelines, we ensure a structured, maintainable, and efficient development workflow.

## Project Owner

Currently, the project is maintained by:

- **Charan Ravela** ([GitHub Profile](https://github.com/CharanRavela))

## Branch Creation Strategy

To maintain a structured workflow, we follow a branch-based development approach. Below are the key guidelines:

- **Main Branch (`main`)**

  - This branch contains stable and production-ready code.
  - Direct commits to this branch are **not** allowed.
  - **Only merges from `pre-main`** are permitted.

- **Pre-Main Branch (`pre-main`)**

  - This is the most stable branch before `main`.
  - All changes must be tested thoroughly before merging into `main`.
  - No direct commits; all changes come from `dev`.

- **Development Branch (`dev`)**

  - This is the active development branch.
  - **All feature and fix branches should be created from here**.
  - Once stable, `dev` is merged into `pre-main`.

- **Feature Branches (`feature/<feature-name>`)**

  - Use this branch to develop new features.
  - Example: `feature/user-authentication`
  - Once completed, create a pull request (PR) to merge it into `dev`.

- **Fix Branches (`fix/<issue-description>`)**
  - Reserved for resolving bugs and issues.
  - Example: `fix/ui-glitch-profile-page`
  - Merge back into `dev` and eventually into `pre-main` and `main`.

### Example Scenarios:

1. **Developing a new feature**

   - Create branch `feature/add-dark-mode` from `dev`.
   - Work on changes, commit regularly.
   - Open PR to merge `feature/add-dark-mode` → `dev`.

2. **Fixing a bug**
   - Create `fix/ui-glitch-profile-page` from `dev`.
   - Implement the fix and push changes.
   - Open PR to merge `fix/ui-glitch-profile-page` → `dev`.

## Pull Request (PR) Guidelines

Pull request guidelines are already enforced via GitHub workflows. Contributors should ensure their PRs align with these automated checks before submission.

### Key Points:

- **Descriptive Title**: Clearly state the purpose of the PR, e.g., `Add user authentication feature`.
- **Detailed Description**:
  - Explain what the PR does.
  - Reference related issues (e.g., `Fixes #123`).
  - Mention dependencies or impacts on other components.
- **Approval & Merging**:
  - At least one team member must review and approve the PR before merging.
  - Use `Squash and Merge` to keep commit history clean.
  - Merge feature branches into `dev`, then eventually to `pre-main`, and finally `main`.

## Commit Message Guide

A well-structured commit history ensures maintainability and traceability. Follow these conventions:

### Format:

```plaintext
<type>: <short description>

[Optional] Longer description detailing the change.
```

### Allowed Commit Types:

| Type       | When to Use                                                | Example                                        |
| ---------- | ---------------------------------------------------------- | ---------------------------------------------- |
| `feat`     | When adding a **new feature**                              | `feat: add dark mode toggle`                   |
| `fix`      | When fixing a **bug or issue**                             | `fix: resolve login issue on mobile`           |
| `refactor` | When restructuring code **without changing functionality** | `refactor: optimize user authentication logic` |
| `docs`     | When updating **documentation**                            | `docs: update README with API usage`           |
| `test`     | When adding or modifying **tests**                         | `test: add unit test for login function`       |
| `perf`     | When improving **performance**                             | `perf: reduce API response time by 20%`        |
| `style`    | When making **code formatting changes**                    | `style: apply consistent indentation`          |
| `chore`    | For non-functional updates like **build system changes**   | `chore: update dependencies`                   |

### Example Good Commit Messages:

✅

```plaintext
feat: add password reset functionality

Users can now reset their password via email verification.
```

✅

```plaintext
fix: correct alignment issue on profile page

Adjusted CSS flex properties to align elements properly.
```

### Example Bad Commit Messages:

❌ `Fixed stuff`  
❌ `Bug fixed`  
❌ `UI changes`

## Development Environment

(_Placeholder - Add setup instructions for the development environment_)

## Testing

(_Placeholder - Add testing guidelines and frameworks used_)

## Industry Standards for Contributions

Following best practices ensures our codebase remains maintainable and scalable. Industry-standard contribution practices include:

- **Code Reviews**: All changes must go through a review process.
- **Automated Testing**: Ensure tests are added for new features and fixes.
- **Consistent Code Style**: Follow project linting and formatting rules.
- **Documentation**: Update relevant documentation when introducing changes.

## Thank You!

Thank you for contributing to this project! Your efforts help improve and maintain a high-quality codebase. If you have any questions, feel free to reach out.
