# 🛠️ Development Guide

Welcome to the developer guide for **datadriven-portfolio**. This document explains how to set up the project locally, run it in development mode, and understand the code structure.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/LeafLock-Security-Solutions/datadriven-portfolio.git
cd datadriven-portfolio
```

### 2. Install Dependencies

Make sure you have **Node.js (>=18.x)** and **npm** or **yarn** installed.

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. Start the Development Server

```bash
# Using npm
npm run dev

# Or using yarn
yarn dev
```

This will start the app on `http://localhost:3000`.

---

## 🌐 Environment Variables

The app reads the remote JSON config file through an environment variable:

```env
VITE_PUBLIC_DATA_URL=https://yourdomain.com/your-portfolio.json
```

You can define this in a `.env` file at the root of the project:

```
# .env
VITE_PUBLIC_DATA_URL=https://charanravela.com/data.json
```

Make sure your JSON file is publicly accessible.

---

## 🧾 Scripts

| Script         | Description                  |
|----------------|------------------------------|
| `dev`          | Starts local dev server       |
| `build`        | Creates a production build    |
| `preview`      | Previews the production build |

---

## 🧩 Project Structure

```bash
datadriven-portfolio/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components
│   ├── sections/            # Sections of the portfolio (About, Projects, etc.)
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── config/              # App-level constants and helpers
│   ├── styles/              # Global CSS or Tailwind config
│   ├── App.tsx              # Main app layout
│   └── main.tsx             # Entry point
├── .env                     # Environment config
└── index.html               # HTML template
```

---

## 🧪 Testing *(Coming Soon)*

Testing support and examples will be added in future versions.

---

## 🤝 Contributing

If you're interested in contributing, please read the [CONTRIBUTING.md](CONTRIBUTING.md) guide.

---

## ❓ Questions?

For support, open an issue at:  
[https://github.com/LeafLock-Security-Solutions/datadriven-portfolio/issues](https://github.com/LeafLock-Security-Solutions/datadriven-portfolio/issues)

