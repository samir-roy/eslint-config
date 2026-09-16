# @samiroy/eslint-config

ESLint config for TypeScript and React.

## Installation

```sh
npm i -D @samiroy/eslint-config eslint
```

Requires ESLint 9 and Node 18.18+. TypeScript is an optional peer, needed only
for the type-aware rules.

## Usage

Flat config (`eslint.config.js`):

```js
const samiroy = require('@samiroy/eslint-config');

module.exports = [
  ...samiroy,
  {
    // your overrides
    rules: {},
  },
];
```

Or as ESM (`eslint.config.mjs`):

```js
import samiroy from '@samiroy/eslint-config';

export default [...samiroy, { rules: {} }];
```

### Type-aware rules

A few rules (`@typescript-eslint/no-unsafe-return`, `switch-exhaustiveness-check`,
`return-await`, …) need type information. The config enables typescript-eslint's
`projectService`, which asks TypeScript itself to locate the right `tsconfig.json`
for each file — no `parserOptions.project` to maintain.

If you lint TypeScript files that no `tsconfig.json` includes (standalone config
files are the usual culprit), either add them to the `include` list or allow them
explicitly:

```js
module.exports = [
  ...samiroy,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: { allowDefaultProject: ['*.config.ts'] },
      },
    },
  },
];
```

### Composing the rules yourself

The rule set is exported in groups, so you can build a different config on top
of the same decisions:

```js
const { react, typescript, imports, prettierOptions } = require('@samiroy/eslint-config/rules');
```

Groups: `errors`, `bestPractices`, `style`, `variables`, `es6`, `imports`,
`react`, `reactHooks`, `a11y`, `typescript`, `prettier`, plus `prettierOptions`.

### React Compiler rules

`eslint-plugin-react-hooks` 7 ships fifteen React Compiler rules in its
`recommended` preset. This config deliberately enables only the two classic ones
(`rules-of-hooks`, `exhaustive-deps`) so upgrading doesn't flood an existing
codebase. Opt in to the rest when you're ready:

```js
const reactHooks = require('eslint-plugin-react-hooks');

module.exports = [...samiroy, reactHooks.configs.flat['recommended-latest']];
```

## Migrating from 2.x

2.x was an eslintrc config built on `eslint-config-airbnb`. 3.0 drops that
dependency — it was unmaintained and peer-pinned to ESLint 8, which in turn
pinned typescript-eslint to 7. Every rule airbnb contributed that still earns
its place now lives in [`rules.js`](./rules.js).

3.0 is flat-config only. Projects that aren't ready to migrate should stay on
2.x, which is unaffected by this release.

What changed:

| | 2.x | 3.0 |
| --- | --- | --- |
| Config format | `.eslintrc` | flat config (`eslint.config.js`) |
| ESLint | 8 | 9 |
| typescript-eslint | 7 | 8 |
| `eslint-plugin-react-hooks` | 4 | 7 |
| `eslint-config-airbnb` | extended | inlined, dependency removed |
| Type info | `parserOptions.project` | `projectService` |
| Formatting rules | some duplicated Prettier | Prettier only |

The `@typescript-eslint/*` formatting rules 2.x set (`brace-style`,
`comma-spacing`, `object-curly-spacing`, `space-infix-ops`, `keyword-spacing`,
`member-delimiter-style`, `type-annotation-spacing`) were removed in
typescript-eslint 8. Prettier already covered all of them.

`max-len` moved to `@stylistic/max-len`, since the core rule is deprecated in
ESLint 9 and removed in 10. Same 120-column limit and ignore patterns.

## License

MIT
