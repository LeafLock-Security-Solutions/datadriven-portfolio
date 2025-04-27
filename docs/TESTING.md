# 🧪 Testing Guide

This document provides guidelines for writing and running tests in the **datadriven-portfolio** project.

> 📝 Note: Testing is optional for now and will be introduced gradually as the project evolves.

---

## ✅ Planned Tools

We plan to use the following testing stack:

- [Jest](https://jestjs.io/) – JavaScript testing framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) – For testing React components
- [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) – Custom Jest matchers for DOM assertions

---

## 🛠️ Setup (Coming Soon)

Testing dependencies will be added soon to `devDependencies` in `package.json`.

Expected setup:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

---

## 🚀 Running Tests

Once setup is complete, tests can be run using:

```bash
# Run all tests
npm test

# Or with yarn
yarn test
```

---

## 📂 Test File Structure

We recommend placing test files alongside the component they test, using the following format:

```
src/components/
├── Button.tsx
└── Button.test.tsx
```

This keeps related files together and easy to manage.

---

## 🧪 Writing Tests

We’ll follow the `describe/it` pattern using React Testing Library:

```tsx
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click Me" />);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });
});
```

---

## 📈 Code Coverage (Optional)

Once set up, run the following command to generate a code coverage report:

```bash
npm run test:coverage
```

This will output results in the `/coverage` folder.

---

## ❗ Linting vs Testing

Remember that linting (with ESLint) catches syntax and style issues, but tests validate functional correctness.

---

## 📬 Need Help?

For questions or help writing tests, feel free to [open an issue](https://github.com/LeafLock-Security-Solutions/datadriven-portfolio/issues).
