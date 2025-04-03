# 🗂️ Folder Structure

This document describes the folder layout of the **datadriven-portfolio** project to help developers quickly understand the organization and purpose of each directory.

---

## 📁 Project Root

```
datadriven-portfolio/
├── public/                 # Static files (favicon, images, index.html)
├── src/                    # Source code for the React application
├── .env                    # Environment variables (example: public JSON URL)
├── index.html              # HTML template used by Vite
├── package.json            # Project dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.ts          # Vite configuration
```

---

## 📂 Inside `src/`

```
src/
├── assets/                 # Images, icons, and other static assets
├── components/             # Reusable UI components (e.g., Button, Card, Navbar)
├── config/                 # App-wide constants or shared config values
├── hooks/                  # Custom React hooks
├── sections/               # Main sections of the portfolio (e.g., Hero, About, Projects)
├── styles/                 # Global styles, Tailwind config extensions
├── utils/                  # Utility functions (e.g., JSON fetch, data parsers)
├── App.tsx                 # Root layout and routing
└── main.tsx                # App entry point
```

---

## 🧾 Description of Key Folders

### `components/`
Contains small and reusable building blocks used across the UI. These are typically stateless and presentational.

### `sections/`
Larger layout blocks like "About", "Projects", or "Contact". These are page-level components using multiple smaller components.

### `config/`
Stores shared constants, feature flags, or config helpers used across the app.

### `hooks/`
Custom React hooks for reusable logic (e.g., fetching data, toggling themes).

### `utils/`
Helper functions for working with data, formatting, and transformations.

### `styles/`
Tailwind base configurations or any global custom styling logic.

---

## 🧠 Notes

- The folder structure is modular to support scalability and readability.
- Each folder may contain an optional `index.ts` file for easier imports.
- This layout supports both static and dynamic JSON data loading.

