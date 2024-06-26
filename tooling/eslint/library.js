const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ['eslint:recommended', 'prettier', 'eslint-config-turbo'],
  plugins: ['only-warn'],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  // ignore dot files
  ignorePatterns: ['.*.js', '.*.cjs', 'node_modules/', 'dist/'],
  overrides: [{ files: ['*.js?(x)', '*.ts?(x)'] }],
};

module.exports = config;
