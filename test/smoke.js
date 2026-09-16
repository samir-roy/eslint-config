/* eslint-disable no-console */
const assert = require('node:assert');
const path = require('node:path');
const { ESLint } = require('eslint');
const { builtinRules } = require('eslint/use-at-your-own-risk');

const flat = require('../index.js');
const rules = require('../rules.js');

const FIXTURES = path.join(__dirname, 'fixture');

const isEnabled = (value) => {
  const severity = Array.isArray(value) ? value[0] : value;
  return severity !== 'off' && severity !== 0;
};

const enabledRules = (config) => Object.entries(config.rules).filter(([, value]) => isEnabled(value));
const failures = [];
const check = async (name, fn) => {
  try {
    await fn();
    console.log(`  ok   ${name}`);
  } catch (err) {
    failures.push(name);
    console.log(`  FAIL ${name}\n       ${err.message}`);
  }
};

const main = async () => {
  console.log('@samiroy/eslint-config smoke tests\n');

  await check('flat config is an array of config objects', () => {
    assert.ok(Array.isArray(flat), 'index.js must export an array');
    assert.ok(flat.length > 0);
    flat.forEach((c) => assert.strictEqual(typeof c, 'object'));
  });

  await check('every configured rule exists (no phantom rule names)', async () => {
    const eslint = new ESLint({ overrideConfigFile: path.join(__dirname, '..', 'index.js') });
    const config = await eslint.calculateConfigForFile(path.join(FIXTURES, 'sample.tsx'));
    const core = new Set(builtinRules.keys());
    const missing = [];
    // eslint-config-prettier switches off rules that ESLint 9 removed; harmless.
    enabledRules(config).forEach(([name]) => {
      if (name.includes('/')) {
        const [pluginName, ...rest] = name.split('/');
        const plugin = config.plugins[pluginName];
        if (!plugin) missing.push(`${name} (plugin "${pluginName}" not registered)`);
        else if (!plugin.rules[rest.join('/')]) missing.push(`${name} (not in plugin)`);
      } else if (!core.has(name)) {
        missing.push(`${name} (not a core rule)`);
      }
    });
    assert.deepStrictEqual(missing, [], `unknown rules:\n       ${missing.join('\n       ')}`);
  });

  await check('no deprecated rules are enabled', async () => {
    const eslint = new ESLint({ overrideConfigFile: path.join(__dirname, '..', 'index.js') });
    const config = await eslint.calculateConfigForFile(path.join(FIXTURES, 'sample.tsx'));
    const deprecated = [];
    enabledRules(config).forEach(([name]) => {
      const rule = name.includes('/')
        ? (config.plugins[name.split('/')[0]] || { rules: {} }).rules[name.split('/').slice(1).join('/')]
        : builtinRules.get(name);
      if (rule && rule.meta && rule.meta.deprecated) deprecated.push(name);
    });
    assert.deepStrictEqual(deprecated, [], `deprecated rules enabled: ${deprecated.join(', ')}`);
  });

  await check('type-aware linting accepts an es2024.promise tsconfig', async () => {
    const eslint = new ESLint({ overrideConfigFile: path.join(__dirname, '..', 'index.js') });
    const [result] = await eslint.lintFiles([path.join(FIXTURES, 'sample.tsx')]);
    const fatal = result.messages.filter((m) => m.fatal);
    assert.deepStrictEqual(fatal, [], `parser errors: ${JSON.stringify(fatal)}`);
    const offenders = result.messages.filter((m) => m.ruleId !== 'import/prefer-default-export');
    assert.deepStrictEqual(
      offenders.map((m) => m.ruleId),
      [],
      'clean file should not report'
    );
  });

  await check('rules actually fire on bad code', async () => {
    const eslint = new ESLint({ overrideConfigFile: path.join(__dirname, '..', 'index.js') });
    const [result] = await eslint.lintFiles([path.join(FIXTURES, 'bad.tsx')]);
    const fired = new Set(result.messages.map((m) => m.ruleId));
    const expected = [
      '@typescript-eslint/no-explicit-any',
      'eqeqeq',
      'no-console',
      'no-restricted-syntax',
      'no-plusplus',
      'react/jsx-curly-brace-presence',
      'jsx-a11y/no-static-element-interactions',
      'jsx-a11y/click-events-have-key-events',
      'guard-for-in',
      '@typescript-eslint/no-unsafe-return',
    ];
    const notFired = expected.filter((r) => !fired.has(r));
    assert.deepStrictEqual(
      notFired,
      [],
      `expected these to fire: ${notFired.join(', ')}\n       got: ${[...fired].join(', ')}`
    );
  });

  await check('rules.js groups are all non-empty objects', () => {
    Object.entries(rules)
      .filter(([group]) => group !== 'prettierOptions')
      .forEach(([group, value]) => assert.ok(Object.keys(value).length > 0, `${group} is empty`));
  });

  console.log(`\n${failures.length ? `${failures.length} failing` : 'all passing'}`);
  process.exit(failures.length ? 1 : 0);
};

main();
