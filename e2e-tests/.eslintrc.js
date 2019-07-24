module.exports = {

  env: {
    es6: true,
    node: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:wdio/recommended',
  ],

  globals: {
    assert: true,
    expect: true,
    SEND_MQTT_MESSAGE: true,
    browser: true,
    $: true,
    $$: true,
  },

  parser: 'babel-eslint',

  parserOptions: {
    ecmaVersion: 2016,
    sourceType: 'module',
  },

  plugins: [
    'wdio',
  ],

  root: true,

  rules: {
    'array-bracket-spacing': ['error', 'never'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    camelcase: ['error', { properties: 'never' }],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'never',
      exports: 'never',
      functions: 'ignore',
    }],
    'comma-spacing': ['error', { before: false, after: true }],
    'global-require': 'off',
    'import/no-extraneous-dependencies': 0,
    indent: ['error', 4, { SwitchCase: 1 }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'max-len': ['error', 120, {
      'ignoreComments': true,
      'ignoreStrings': true,
      'ignoreTrailingComments': true,
      'ignoreRegExpLiterals': true,
    }],
    'new-cap': ['error', {
      newIsCap: true,
      capIsNewExceptions: ['Given', 'When', 'Then', 'SEND_MQTT_MESSAGE'],
    }],
    'no-lonely-if': 'error',
    'no-multiple-empty-lines': [2, { 'max': 1, 'maxEOF': 1 }],
    'no-tabs': 'error',
    'no-trailing-spaces': ['error', {
      skipBlankLines: false,
      ignoreComments: false,
    }],
    'object-curly-spacing': ['error', 'always'],
    quotes: ['error', 'single'],
    'require-atomic-updates': 0,
    'require-jsdoc': ['error', { require: { ClassDeclaration: true } }],
    strict: 'off',
    'unicode-bom': ['error', 'never'],
    'valid-jsdoc': ['error', { requireReturn: false, matchDescription: '.+' }],
  },
};
