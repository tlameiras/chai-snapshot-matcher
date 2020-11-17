module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:prettier/recommended', 'plugin:mocha/recommended'],
  plugins: ['prettier', 'mocha', 'chai-expect'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'prettier/prettier': 'error',
    'no-underscore-dangle': ['error', { allow: ['_runnable'] }],
    'func-names': 'off',
    'no-unused-expressions': 'off',
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'no-console': ['error', { allow: ['info'] }],
    'mocha/no-hooks-for-single-case': ['error', { allow: ['after'] }],
  },
};
