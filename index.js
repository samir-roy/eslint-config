const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const globals = require('globals');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const importPlugin = require('eslint-plugin-import');
const prettierPlugin = require('eslint-plugin-prettier');
const stylisticPlugin = require('@stylistic/eslint-plugin');
const prettierConfig = require('eslint-config-prettier');

const rules = require('./rules.js');

const ALL_FILES = ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'];
const TS_FILES = ['**/*.{ts,mts,cts,tsx}'];
const JS_FILES = ['**/*.{js,mjs,cjs,jsx}'];

module.exports = [
  {
    name: 'samiroy/ignores',
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/coverage/**', '**/*.min.js'],
  },

  {
    name: 'samiroy/languages',
    files: ALL_FILES,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.mts', '.cts'],
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src/'],
        },
        typescript: {},
      },
      react: {
        version: 'detect',
      },
    },
  },

  // Recommended baselines. Everything airbnb used to add on top of these now
  // lives in ./rules.js.
  {
    name: 'samiroy/js-recommended',
    files: ALL_FILES,
    ...js.configs.recommended,
  },
  ...tseslint.configs.recommended.map((config) => ({ ...config, files: TS_FILES })),
  {
    name: 'samiroy/react-recommended',
    files: ALL_FILES,
    plugins: { react: reactPlugin },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactPlugin.configs.flat['jsx-runtime'].rules,
    },
  },
  {
    name: 'samiroy/jsx-a11y-recommended',
    files: ALL_FILES,
    plugins: { 'jsx-a11y': jsxA11yPlugin },
    rules: jsxA11yPlugin.flatConfigs.recommended.rules,
  },
  {
    name: 'samiroy/import-recommended',
    files: ALL_FILES,
    plugins: { import: importPlugin },
    rules: {
      ...importPlugin.flatConfigs.recommended.rules,
      ...importPlugin.flatConfigs.typescript.rules,
    },
  },

  // Type-aware linting. `projectService` lets TypeScript itself resolve each
  // file's tsconfig, so `compilerOptions.lib` values are read from the real
  // compiler rather than a snapshot bundled inside the parser.
  {
    name: 'samiroy/typescript',
    files: TS_FILES,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
  },
  {
    name: 'samiroy/javascript',
    files: JS_FILES,
    ...tseslint.configs.disableTypeChecked,
  },

  // The rule set itself.
  {
    name: 'samiroy/rules',
    files: ALL_FILES,
    plugins: {
      'react-hooks': reactHooksPlugin,
      prettier: prettierPlugin,
      '@stylistic': stylisticPlugin,
    },
    rules: {
      ...rules.errors,
      ...rules.bestPractices,
      ...rules.style,
      ...rules.variables,
      ...rules.es6,
      ...rules.imports,
      ...rules.react,
      ...rules.reactHooks,
      ...rules.a11y,
    },
  },
  {
    name: 'samiroy/rules-typescript',
    files: TS_FILES,
    rules: rules.typescript,
  },

  // Prettier last: turn off every formatting rule, then run Prettier as a rule.
  {
    name: 'samiroy/prettier',
    files: ALL_FILES,
    rules: {
      ...prettierConfig.rules,
      ...rules.prettier,
    },
  },
];
