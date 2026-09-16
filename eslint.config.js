const config = require('./index.js');

module.exports = [
  ...config,
  {
    // Fixtures are deliberately full of violations; the smoke tests assert on them.
    ignores: ['test/fixture/**', '.tmp-*/**'],
  },
  {
    // This package has no React dependency of its own, so "detect" has nothing to find.
    settings: { react: { version: '18.0' } },
  },
  {
    files: ['**/*.js'],
    rules: {
      // This package is CommonJS: it exports config objects, not ES modules.
      'import/no-import-module-exports': 'off',
      'import/prefer-default-export': 'off',
      'import/no-anonymous-default-export': 'off',
    },
  },
];
