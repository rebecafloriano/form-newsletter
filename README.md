# 📧 Modern Newsletter Subscription Form

A professional, highly accessible, and strictly tested newsletter subscription form built with **React**, **TypeScript**, and **Tailwind CSS**.

[![CI Pipeline](https://github.com/rebecafloriano/form-newsletter/actions/workflows/main.yml/badge.svg)](https://github.com/rebecafloriano/form-newsletter/actions/workflows/main.yml)
![Acessibilidade](https://img.shields.io/badge/axe__DevTools-0__issues-brightgreen)
![Tests](https://img.shields.io/badge/Vitest-15__passed-brightgreen)

![Project Screenshot](./src/assets/screenshot.png)

> 🚀 **Live Demo:** > https://rebecafloriano.github.io/form-newsletter/

---

## ✨ Key Features

- **Production-Ready Architecture** Separation of concerns between UI atomic elements, business logic layer (`validate.ts`), and strict TypeScript typing.
- **Robust Automated Testing Suite** 15 comprehensive unit and integration tests tracking DOM rendering, asynchronous state shifts (loading, success, error), and edge-case form logic.
- **Strict Linting & Code Formatting** Zero-warning code baseline enforced locally and on remote environments via ESLint and Prettier formatting pipelines.
- **Strict Accessibility Compliance (WCAG 2.1 AA)** Audited with `axe DevTools` ensuring a flawless **0 issues** score, utilizing semantic layout landmarks (`<form>`, labels) and high color contrast thresholds.
- **API Integration & Validation Trimming** Full input string trimming defense to filter out malicious whitespace inputs before safe payload delivery via Web3Forms.

---

## 🛠️ Tech Stack

- **React 19**
- **TypeScript** (Strict Mode)
- **Tailwind CSS**
- **Vite**
- **Vitest** & **React Testing Library** (Test Environment)
- **ESLint** & **Prettier** (Code Quality)

---

## 🚀 How to Run & Validate the Project

Follow these steps to spin up the environment and run the full engineering pipeline locally:

### 1. Setup and Installation
  ```bash
    # Clone the repository
    git clone [https://github.com/rebecafloriano/form-newsletter.git](https://github.com/rebecafloriano/form-newsletter.git)

    # Navigate to the project folder
    cd form-newsletter

    # Perform a clean dependency installation
    npm install
```

### 2. Development & Build Scripts
  ```bash
# Start the local development server (Vite)
npm run dev

# Compile TypeScript and build for production
npm run build    
  ```

### 3. Quality Assurance Pipeline (Local CI Checking)
 ```bash
# 🧪 Run the full automated testing suite (15 tests)
npm run test

# 🎨 Check code formatting rules via Prettier
npm run format:check

# 🪛 Automatically fix code styling and alignment issues
npm run format:fix

# 🔍 Run static analysis to catch syntax warnings and hidden bugs
npm run lint    
  ```
## 🤖 Continuous Integration (CI/CD)
This repository enforces a strict GitHub Actions Pipeline (`main.yml`) on every push and pull request to the `main` branch. The automated workflow guarantees the stability of the live application by executing:

Fresh workspace dependency setup (`npm ci`).

Code style checks (`Prettier`).

Static code validation (`ESLint` code quality check with 0 warnings allowance).

Full testing suite execution (`Vitest`).

Production build compilation and deployment to GitHub Pages.

## 📂 Project Structure
```Plaintext
src/
├── assets/          # Static layout assets and screenshots
├── components/      
│   ├── ui/          # Atomic reusable UI components (Input, Button, Checkbox)
│   └── Form.tsx     # Main Form container integration component
├── types/           # Core TypeScript data structures and models
├── utils/           # Pure, decoupled business rules and validations
├── App.tsx          # Application root view wrapper
└── setupTests.ts    # Extended Jest-DOM matching extensions for Vitest