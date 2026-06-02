# Code Formatting Guide

## Tools

This project uses:

- **Prettier** - Code formatting
- **ESLint** - Code linting
- **EditorConfig** - Editor consistency

## Installation

```bash
npm install -D prettier eslint eslint-config-prettier eslint-plugin-jest
```

Or with yarn:

```bash
yarn add -D prettier eslint eslint-config-prettier eslint-plugin-jest
```

## Usage

### Format all files

```bash
npm run format
```

### Check formatting (CI)

```bash
npm run format:check
```

### Lint code

```bash
npm run lint
```

### Auto-fix linting issues

```bash
npm run lint:fix
```

## VSCode Setup

### Required Extensions

1. **Prettier - Code formatter** (`esbenp.prettier-vscode`)
2. **ESLint** (`dbaeumer.vscode-eslint`)
3. **EditorConfig** (`editorconfig.editorconfig`)

### Settings

Your `.vscode/settings.json` is already configured:

```json
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
    }
}
```

## Formatting Rules

### JavaScript/TypeScript

- **Indent**: 4 spaces
- **Quotes**: Double quotes
- **Semicolons**: Always
- **Line length**: 100 characters
- **Trailing commas**: ES5 (objects, arrays)

### JSON/YAML

- **Indent**: 2 spaces

### Markdown

- **Line length**: 80 characters
- **Prose wrap**: Always

## Example

**Before formatting:**

```javascript
function test(a, b, c) {
    const result = a + b + c;
    return result;
}
```

**After formatting:**

```javascript
function test(a, b, c) {
    const result = a + b + c;
    return result;
}
```

## Git Hooks (Optional)

To format code automatically on commit, install Husky:

```bash
npm install -D husky lint-staged
```

Add to `package.json`:

```json
{
    "lint-staged": {
        "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
        "*.{json,css,md}": ["prettier --write"]
    }
}
```

Setup hooks:

```bash
npx husky init
echo "npx lint-staged" > .husky/pre-commit
```

## Ignoring Files

### Prettier

Edit `.prettierignore`:

```
node_modules/
dist/
*.wasm
```

### ESLint

Edit `.eslintignore`:

```
node_modules/
dist/
wasm/bclibc.js
```

## CI/CD Integration

Add to your CI pipeline:

```yaml
# .github/workflows/ci.yml
- name: Check formatting
  run: npm run format:check

- name: Lint
  run: npm run lint
```

## Manual Commands

### Format specific file

```bash
npx prettier --write path/to/file.js
```

### Check specific file

```bash
npx prettier --check path/to/file.js
```

### Lint specific file

```bash
npx eslint path/to/file.js
```

## Troubleshooting

### Prettier not working in VSCode

1. Check extension is installed: `Prettier - Code formatter`
2. Check settings: `"editor.defaultFormatter": "esbenp.prettier-vscode"`
3. Reload VSCode: `Ctrl+Shift+P` → "Reload Window"

### Conflicts between ESLint and Prettier

Already configured with `eslint-config-prettier` which disables conflicting
ESLint rules.

### Format on save not working

Check these settings:

```json
{
    "editor.formatOnSave": true,
    "prettier.requireConfig": true
}
```

Make sure `.prettierrc` exists in project root.

## Team Workflow

1. **Before commit**: Run `npm run format && npm run lint:fix`
2. **Code review**: Check formatting with `npm run format:check`
3. **CI**: Automatically checks formatting and linting

## Customization

To change formatting rules, edit `.prettierrc`:

```json
{
    "tabWidth": 4,
    "printWidth": 100,
    "singleQuote": false
}
```

To change linting rules, edit `.eslintrc.json`:

```json
{
    "rules": {
        "no-console": "warn"
    }
}
```
