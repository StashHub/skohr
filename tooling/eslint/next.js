import { resolve } from 'node:path';

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import('eslint').Linter.Config} */
const config = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'prettier',
    require.resolve('@vercel/style-guide/eslint/next'),
    'eslint-config-turbo',
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  plugins: ['only-warn', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  // ignore dot files
  ignorePatterns: ['.*.js', 'node_modules/'],
  overrides: [{ files: ['*.js?(x)', '*.ts?(x)'] }],
  rules: {
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        'prefer': 'type-imports',
        'fixStyle': 'inline-type-imports'
      }
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        'argsIgnorePattern': '^_'
      }
    ],
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        'checksVoidReturn': {
          'attributes': false
        }
      }
    ]
  },
};

export default config
