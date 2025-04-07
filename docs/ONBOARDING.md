# 🧑‍💻 Developer Onboarding Tasks

Welcome to the **datadriven-portfolio** project! This guide is designed to help new contributors—especially those who are still early in their journey—get started with the project smoothly.

---

## ✅ Step 0: Prerequisites

Before starting, please ensure you have the following installed:

- [Git](https://git-scm.com/downloads)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [VS Code](https://code.visualstudio.com/) with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

> You do **not** need to install Node.js or anything else manually. Everything is containerized 🚀

---

## 🛠 Step 1: Git Setup (SSH + Gitsign)

### 1.1 Generate SSH Key

Follow this guide to [generate a new SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

### 1.2 Add SSH Key to GitHub

Then [add the SSH key to GitHub](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).

### 1.3 Test Your SSH Setup

You can [test the SSH connection](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection) to ensure it works.

### 1.4 Setup Gitsign (Required)

We use [Sigstore Gitsign](../docs/COMMIT_SIGNING_GUIDE.md) for commit signing. Please follow the instructions in `docs/COMMIT_SIGNING_GUIDE.md`.

---

## 📦 Step 2: Fork and Clone the Repository

### 2.1 Fork the Repository

Go to the official repo:  
👉 [https://github.com/LeafLock-Security-Solutions/datadriven-portfolio](https://github.com/LeafLock-Security-Solutions/datadriven-portfolio)  
Click on the **Fork** button (top right) to create your own copy.

### 2.2 Clone Your Fork Using SSH

> Make sure to use the **SSH link from your forked repo**, not HTTPS.

```bash
# Example command (replace with your username)
git clone git@github.com:<your-username>/datadriven-portfolio.git
cd datadriven-portfolio
```

---

## 🐳 Step 3: Launch Dev Container

Once you open the project folder in VS Code:

1. Press `F1` and select: **Dev Containers: Reopen in Container**
2. It will automatically set up the environment and install dependencies

---

## 🚀 Step 4: Run the Project

Use this to start the local server inside the dev container:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the project running.  
If 0.0.0.0 doesn’t work on your machine, try `localhost` instead (Windows-specific).

You can also try:

```bash
npm run preview   # Runs a production build
```

---

## 🧪 Step 5: Experiment with Dev Tools

Try these commands in the terminal:

- `npm run lint` – show lint errors
- `npm run lint:fix` – auto fix issues
- `npm run spell` – run spell check
- `npm test` – run test suite (will be populated soon)

---

## 🌱 Step 6: Understand Branching

Once you're comfortable:

- **Always create a branch** before making changes

```bash
git checkout -b <feature-name>
```

- **Never commit directly to `main`**
- Push your branch:

```bash
git push origin <feature-name>
```

- Open a Pull Request from your fork to the `main` branch of the original repo.

---

## ✍️ Step 7: Make and Push Changes

1. Make any changes or create a new file
2. Stage + commit your changes:

```bash
git add .
git commit -m "feat: add example component"
```

3. Push to your fork:

```bash
git push origin <your-branch>
```

Then, go to GitHub and open a PR! 🚀

---

## 🧠 Tips for Success

- Don’t hesitate to experiment
- Ask questions if you’re confused
- Refer to the `docs/` folder for project conventions
- Make small, meaningful commits
- Keep PRs focused on one topic

Happy contributing! 💙
