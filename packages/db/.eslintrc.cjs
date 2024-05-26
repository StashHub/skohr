/** @type {import('eslint').Linter.Config} */
module.exports = {
  'extends': ['@skohr/eslint-config/library.js'],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'project': true,
  },
};
