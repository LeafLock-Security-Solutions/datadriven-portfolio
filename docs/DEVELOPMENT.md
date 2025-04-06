# 🛠️ Development Guide

Welcome to the developer guide for **datadriven-portfolio**. This document explains how to set up the project locally using Docker, run it in development mode, and understand the code structure.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/LeafLock-Security-Solutions/datadriven-portfolio.git
cd datadriven-portfolio
```

### 2. Build and Start the Dev Container

Ensure you have **Docker** and **Dev Containers (VS Code Extension)** installed.

1. Open the project in VS Code
2. When prompted, reopen in container — or manually:

```bash
# If using devcontainers CLI
devcontainer open .
```

3. VS Code will build the container using `Dockerfile` and `devcontainer.json`.

> ℹ️ First-time setup may take a few minutes to pull images and install dependencies.

### 3. Start the Development Server (inside container)

Once inside the dev container terminal:

```bash
npm run dev
```

This will start the app on `http://localhost:5173` (or similar port).

---

## 🌐 Environment Variables

The app reads the remote JSON config file through an environment variable:

```env
VITE_PUBLIC_DATA_URL=https://yourdomain.com/your-portfolio.json
```

You can define this in a `.env` file at the root of the project:

```bash
# .env
VITE_PUBLIC_DATA_URL=https://charanravela.com/data.json
```

Make sure your JSON file is publicly accessible.

---

## 🧾 Scripts

| Script         | Description                      |
| -------------- | -------------------------------- |
| `dev`          | Starts local dev server          |
| `build`        | Creates a production build       |
| `preview`      | Previews the production build    |
| `format`       | Formats all files using Prettier |
| `format:check` | Checks formatting consistency    |
| `lint`         | Runs ESLint on all files         |
| `lint:fix`     | Runs ESLint and fixes issues     |

---

## 🧹 Project Structure

```bash
datadriven-portfolio/
├── .devcontainer/           # Dev container setup
├── docs/                    # Project documentation files
├── public/                  # Static assets
├── src/                     # Source code
│   ├── components/          # Reusable UI components
│   ├── sections/            # Portfolio sections (About, Projects, etc.)
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── config/              # App-level constants and helpers
│   ├── styles/              # Global CSS or Tailwind config
│   ├── App.jsx              # Main app layout
│   └── main.jsx             # Entry point
├── .env                     # Environment config
├── Dockerfile               # Base image definition
├── docker-compose.yml       # Container orchestration
└── index.html               # HTML template
```

---

## 🦪 Testing _(Coming Soon)_

Testing support and examples will be added in future versions.

---

## 🤝 Contributing

If you're interested in contributing, please read the [CONTRIBUTING.md](docs/CONTRIBUTING.md) guide.

---

## ❓ Questions?

For support, open an issue at:  
[https://github.com/LeafLock-Security-Solutions/datadriven-portfolio/issues](https://github.com/LeafLock-Security-Solutions/datadriven-portfolio/issues)
