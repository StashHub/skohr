import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'packages/*',
  { extends: './vitest.config.ts' },
]);
