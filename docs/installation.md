---
sidebar_position: 2
---

# Installation

Get DocuHub up and running on your machine in just a few minutes.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** version 18.0 or higher
- **npm** or **yarn** package manager
- **Git** (optional, but recommended)

### Check your Node.js version
```bash
node --version
```

If you need to install or update Node.js, visit [nodejs.org](https://nodejs.org/).

## Installation Methods

### Method 1: NPM (Recommended)

The fastest way to get started is using npm:
```bash
npx create-docuhub@latest my-docs
cd my-docs
npm install
npm start
```

Your documentation site will open at `http://localhost:3000`.

### Method 2: Yarn

If you prefer Yarn:
```bash
yarn create docuhub my-docs
cd my-docs
yarn install
yarn start
```

### Method 3: Manual Installation

For more control over the installation:
```bash
# Clone the repository
git clone https://github.com/docuhub/starter-template.git my-docs
cd my-docs

# Install dependencies
npm install

# Start the development server
npm start
```

## Project Structure

After installation, your project will have this structure:
```
my-docs/
├── docs/
│   ├── intro.md
│   ├── installation.md
│   └── api/
├── src/
│   ├── components/
│   ├── css/
│   └── pages/
├── static/
│   └── img/
├── docusaurus.config.js
└── package.json
```

### Key Directories

- **`docs/`** - Your documentation Markdown files
- **`src/`** - Custom React components and pages
- **`static/`** - Static assets (images, files)
- **`docusaurus.config.js`** - Site configuration

## Verify Installation

To verify everything is working correctly:

1. **Check the development server** - Visit `http://localhost:3000`
2. **Edit a file** - Open `docs/intro.md` and make a change
3. **See live reload** - Your changes should appear instantly

## Common Issues

### Port 3000 Already in Use

If port 3000 is already in use, you can specify a different port:
```bash
npm start -- --port 3001
```

### Node Version Error

If you see a Node version error, upgrade Node.js to version 18 or higher:
```bash
node --version  # Check current version
```

Visit [nodejs.org](https://nodejs.org/) to download the latest LTS version.

### Module Not Found

If you encounter "module not found" errors:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

Now that DocuHub is installed, you're ready to:

- [Configure your site →](./configuration)
- [Write your first doc →](./guides/writing-docs)
- [Deploy to production →](./deployment)

---

**Congratulations!** 🎉 You've successfully installed DocuHub.