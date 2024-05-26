/** @type {import('eslint').Linter.Config} */
module.exports = {
  'root': true,
  'extends': ['@skohr/eslint-config/react.js'],
  'parser': '@typescript-eslint/parser',
  'rules': {
    'no-redeclare': 'off',
  },
};
