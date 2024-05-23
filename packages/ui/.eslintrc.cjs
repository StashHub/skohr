/** @type {import('eslint').Linter.Config} */
const config = {
  'root': true,
  'extends': ['@repo/eslint-config/react.js'],
  'parser': '@typescript-eslint/parser',
  'rules': {
    'no-redeclare': 'off',
  },
};

module.exports = config;
