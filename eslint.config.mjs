import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Import Order Rules
  {
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node built-ins: fs, path
            'external', // npm packages
            'internal', // Aliased paths: @/...
            ['parent', 'sibling', 'index'],
            'object',
            'type', // Type-only imports (TS)
          ],
          pathGroups: [
            // React always first
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            // Next.js core
            {
              pattern: 'next/**',
              group: 'external',
              position: 'before',
            },
            // Aliased internal paths
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: true, // so @/aliases work
      },
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
];

export default eslintConfig;
