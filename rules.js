/**
 * The complete rule set, grouped by concern.
 *
 * These groups were previously inherited from `eslint-config-airbnb`, which is
 * unmaintained and peer-pinned to ESLint 8. They are now declared here directly,
 * modernised for ESLint 9 + typescript-eslint 8:
 *
 *  - formatting rules are omitted entirely (Prettier owns formatting)
 *  - deprecated core rules are replaced by their successors
 *  - core rules that misfire on TypeScript are swapped for their
 *    `@typescript-eslint/*` extension counterparts
 */

/** Options handed to Prettier via `prettier/prettier`. */
const prettierOptions = {
  arrowParens: 'always',
  bracketSpacing: true,
  bracketSameLine: false,
  printWidth: 120,
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  useTabs: false,
};

/** Rules that catch outright mistakes, beyond `@eslint/js` recommended. */
const errors = {
  'no-await-in-loop': 'error',
  'no-console': 'warn',
  'no-inner-declarations': 'error',
  'no-promise-executor-return': 'error',
  'no-template-curly-in-string': 'error',
  'no-unreachable-loop': ['error', { ignore: [] }],
};

/** Rules that steer towards safer patterns. */
const bestPractices = {
  'array-callback-return': ['error', { allowImplicit: true }],
  'block-scoped-var': 'error',
  'consistent-return': 'error',
  'default-case': ['error', { commentPattern: '^no default$' }],
  'default-case-last': 'error',
  eqeqeq: ['error', 'always', { null: 'ignore' }],
  'grouped-accessor-pairs': 'error',
  'guard-for-in': 'error',
  'max-classes-per-file': ['error', 1],
  'no-alert': 'warn',
  'no-caller': 'error',
  'no-constructor-return': 'error',
  'no-else-return': ['error', { allowElseIf: false }],
  'no-eval': 'error',
  'no-extend-native': 'error',
  'no-extra-bind': 'error',
  'no-extra-label': 'error',
  'no-iterator': 'error',
  'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
  'no-lone-blocks': 'error',
  'no-loop-func': 'error',
  'no-multi-str': 'error',
  'no-new': 'error',
  'no-new-func': 'error',
  'no-new-wrappers': 'error',
  'no-object-constructor': 'error', // replaces the deprecated no-new-object
  'no-octal-escape': 'error',
  'no-param-reassign': [
    'error',
    {
      props: true,
      ignorePropertyModificationsFor: [
        'acc',
        'accumulator',
        'e',
        'ctx',
        'context',
        'req',
        'request',
        'res',
        'response',
        '$scope',
        'staticContext',
      ],
    },
  ],
  'no-proto': 'error',
  'no-restricted-properties': [
    'error',
    { object: 'arguments', property: 'callee', message: 'arguments.callee is deprecated' },
    { object: 'global', property: 'isFinite', message: 'Please use Number.isFinite instead' },
    { object: 'self', property: 'isFinite', message: 'Please use Number.isFinite instead' },
    { object: 'window', property: 'isFinite', message: 'Please use Number.isFinite instead' },
    { object: 'global', property: 'isNaN', message: 'Please use Number.isNaN instead' },
    { object: 'self', property: 'isNaN', message: 'Please use Number.isNaN instead' },
    { object: 'window', property: 'isNaN', message: 'Please use Number.isNaN instead' },
    { property: '__defineGetter__', message: 'Please use Object.defineProperty instead.' },
    { property: '__defineSetter__', message: 'Please use Object.defineProperty instead.' },
    { object: 'Math', property: 'pow', message: 'Use the exponentiation operator (**) instead.' },
  ],
  'no-return-assign': ['error', 'always'],
  'no-script-url': 'error',
  'no-self-compare': 'error',
  'no-sequences': 'error',
  'no-useless-concat': 'error',
  'no-useless-return': 'error',
  'no-void': 'error',
  'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
  'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
  radix: 'error',
  'vars-on-top': 'error',
  yoda: 'error',
};

/** Non-formatting stylistic rules that survive Prettier. */
const style = {
  camelcase: ['error', { properties: 'never', ignoreDestructuring: false }],
  'func-names': 'warn',
  'new-cap': [
    'error',
    {
      newIsCap: true,
      newIsCapExceptions: [],
      capIsNew: false,
      capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'],
    },
  ],
  'no-bitwise': 'error',
  'no-continue': 'error',
  'no-lonely-if': 'error',
  'no-multi-assign': 'error',
  'no-nested-ternary': 'error',
  'no-plusplus': 'error',
  'no-restricted-syntax': [
    'error',
    {
      selector: 'ForInStatement',
      message:
        'for..in loops iterate over the entire prototype chain, which is virtually never what you want. ' +
        'Use Object.{keys,values,entries}, and iterate over the resulting array.',
    },
    {
      selector: 'LabeledStatement',
      message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
    },
    {
      selector: 'WithStatement',
      message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
    },
  ],
  'no-underscore-dangle': [
    'error',
    {
      allow: ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'],
      allowAfterThis: false,
      allowAfterSuper: false,
      enforceInMethodNames: true,
    },
  ],
  'no-unneeded-ternary': ['error', { defaultAssignment: false }],
  'one-var': ['error', 'never'],
  'operator-assignment': ['error', 'always'],
  'prefer-exponentiation-operator': 'error',
  'prefer-object-spread': 'error',
  'unicode-bom': ['error', 'never'],
};

/** Variable declaration and shadowing rules. */
const variables = {
  'no-label-var': 'error',
  'no-restricted-globals': [
    'error',
    { name: 'isFinite', message: 'Use Number.isFinite instead.' },
    { name: 'isNaN', message: 'Use Number.isNaN instead.' },
  ],
  'no-undef-init': 'error',
};

/** Rules for modern JavaScript syntax. */
const es6 = {
  'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],
  'no-new-native-nonconstructor': 'error', // replaces the deprecated no-new-symbol
  'no-restricted-exports': ['error', { restrictedNamedExports: ['default', 'then'] }],
  'no-useless-computed-key': 'error',
  'no-useless-rename': ['error', { ignoreDestructuring: false, ignoreImport: false, ignoreExport: false }],
  'object-shorthand': ['error', 'always', { ignoreConstructors: false, avoidQuotes: true }],
  'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
  'prefer-destructuring': [
    'error',
    {
      VariableDeclarator: { array: false, object: true },
      AssignmentExpression: { array: true, object: false },
    },
    { enforceForRenamedProperties: false },
  ],
  'prefer-numeric-literals': 'error',
  'prefer-template': 'error',
  'symbol-description': 'error',
};

/** `eslint-plugin-import` rules. */
const imports = {
  'import/extensions': 'off',
  'import/first': 'error',
  'import/newline-after-import': 'error',
  'import/no-absolute-path': 'error',
  'import/no-amd': 'error',
  'import/no-anonymous-default-export': [
    'error',
    {
      allowArray: false,
      allowArrowFunction: false,
      allowAnonymousClass: false,
      allowAnonymousFunction: false,
      allowLiteral: false,
      allowObject: false,
    },
  ],
  'import/no-cycle': ['error', { maxDepth: '∞' }],
  'import/no-dynamic-require': 'error',
  'import/no-extraneous-dependencies': 'off',
  'import/no-import-module-exports': ['error', { exceptions: [] }],
  'import/no-mutable-exports': 'error',
  'import/no-named-default': 'error',
  'import/no-relative-packages': 'error',
  'import/no-self-import': 'error',
  'import/no-unresolved': 'off',
  'import/no-useless-path-segments': ['error', { commonjs: true }],
  'import/no-webpack-loader-syntax': 'error',
  'import/order': ['error', { groups: [['builtin', 'external', 'internal']] }],
  'import/prefer-default-export': 'error',
};

/** `eslint-plugin-react` rules. */
const react = {
  'react/button-has-type': ['error', { button: true, submit: true, reset: false }],
  'react/default-props-match-prop-types': ['error', { allowRequiredDefaults: false }],
  'react/destructuring-assignment': ['error', 'always'],
  'react/forbid-foreign-prop-types': ['warn', { allowInPropTypes: true }],
  'react/forbid-prop-types': [
    'error',
    { forbid: ['any', 'array', 'object'], checkContextTypes: true, checkChildContextTypes: true },
  ],
  'react/function-component-definition': [
    'error',
    { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
  ],
  'react/jsx-boolean-value': ['error', 'never', { always: [] }],
  'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
  'react/jsx-filename-extension': 'off',
  'react/jsx-fragments': ['error', 'syntax'],
  'react/jsx-no-bind': [
    'error',
    { ignoreRefs: true, allowArrowFunctions: true, allowFunctions: false, allowBind: false, ignoreDOMComponents: true },
  ],
  'react/jsx-no-constructed-context-values': 'error',
  'react/jsx-no-script-url': ['error', [{ name: 'Link', props: ['to'] }]],
  'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
  'react/jsx-one-expression-per-line': 'off',
  'react/jsx-pascal-case': ['error', { allowAllCaps: true, ignore: [] }],
  'react/jsx-props-no-spreading': 'off',
  'react/no-access-state-in-setstate': 'error',
  'react/no-array-index-key': 'error',
  'react/no-arrow-function-lifecycle': 'error',
  'react/no-danger': 'warn',
  'react/no-did-update-set-state': 'error',
  'react/no-invalid-html-attribute': 'error',
  'react/no-namespace': 'error',
  'react/no-redundant-should-component-update': 'error',
  'react/no-this-in-sfc': 'error',
  'react/no-typos': 'error',
  'react/no-unstable-nested-components': 'error',
  'react/no-unused-class-component-methods': 'error',
  'react/no-unused-prop-types': 'error',
  'react/no-unused-state': 'error',
  'react/no-will-update-set-state': 'error',
  'react/prefer-es6-class': ['error', 'always'],
  'react/prefer-stateless-function': ['error', { ignorePureComponents: true }],
  'react/prop-types': 'off', // TypeScript handles this
  'react/require-default-props': 'off',
  'react/self-closing-comp': 'error',
  'react/state-in-constructor': ['error', 'always'],
  'react/static-property-placement': ['error', 'property assignment'],
  'react/style-prop-object': 'error',
  'react/void-dom-elements-no-children': 'error',
};

/** The two classic hook rules, matching the pre-3.0 behaviour. */
const reactHooks = {
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn',
};

/** `eslint-plugin-jsx-a11y` rules beyond its own recommended set. */
const a11y = {
  'jsx-a11y/lang': 'error',
};

/**
 * `@typescript-eslint` rules, including the extension rules that replace core
 * rules which produce false positives on TypeScript syntax.
 */
const typescript = {
  // core rules switched off in favour of their TS-aware counterparts
  'default-param-last': 'off',
  'dot-notation': 'off',
  'no-empty-function': 'off',
  'no-implied-eval': 'off',
  'no-redeclare': 'off',
  'no-shadow': 'off',
  'no-throw-literal': 'off',
  'no-unused-vars': 'off',
  'no-use-before-define': 'off',
  'no-useless-constructor': 'off',

  '@typescript-eslint/default-param-last': 'error',
  '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],
  '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions', 'functions', 'methods'] }],
  '@typescript-eslint/no-implied-eval': 'error',
  '@typescript-eslint/no-redeclare': 'error',
  '@typescript-eslint/no-shadow': 'error',
  '@typescript-eslint/no-unused-vars': 'error',
  '@typescript-eslint/no-useless-constructor': 'error',
  '@typescript-eslint/only-throw-error': 'error',
  '@typescript-eslint/return-await': ['error', 'in-try-catch'],

  // TypeScript-specific rules
  '@typescript-eslint/adjacent-overload-signatures': 'error',
  '@typescript-eslint/array-type': ['error', { default: 'array' }],
  '@typescript-eslint/consistent-type-assertions': [
    'error',
    { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow' },
  ],
  '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', disallowTypeAnnotations: true }],
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-unnecessary-type-constraint': 'error',
  '@typescript-eslint/no-unsafe-return': 'error',
  '@typescript-eslint/prefer-as-const': 'error',
  '@typescript-eslint/prefer-includes': 'error',
  '@typescript-eslint/switch-exhaustiveness-check': 'error',
};

/**
 * Prettier integration plus the one length rule Prettier cannot enforce.
 *
 * Prettier will not break long string literals, comments or JSX attribute
 * values, so `max-len` still earns its place. Core `max-len` is deprecated in
 * ESLint 9 and removed in 10, so the `@stylistic` version is used instead.
 */
const prettier = {
  'prettier/prettier': ['warn', prettierOptions],
  '@stylistic/max-len': [
    'error',
    {
      code: prettierOptions.printWidth,
      ignoreRegExpLiterals: true,
      ignoreTrailingComments: true,
      ignorePattern: '(^\\s*?const .* = ["`\'].*["`\'];$)|(^import.*;$)|(^\\s*?d=["`\'].*["`\']$)',
    },
  ],
};

module.exports = {
  prettierOptions,
  errors,
  bestPractices,
  style,
  variables,
  es6,
  imports,
  react,
  reactHooks,
  a11y,
  typescript,
  prettier,
};
