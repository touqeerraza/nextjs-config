// configs/.eslintrc.js
module.exports = {
  root: true,
  extends: [
    'prettier',
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:@cspell/recommended',
  ],
  plugins: ['import', '@cspell', 'prettier', '@typescript-eslint'],
  rules: {
    alphabetize: {
      order: 'asc',
      caseInsensitive: true,
    },
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'jest',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'next/*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/theme/**/*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/components/*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/providers/*',
            group: 'external',
            position: 'before',
          },
        ],
        'prettier/prettier': ['error'],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        'newlines-between': 'always-and-inside-groups',
        pathGroupsExcludedImportTypes: ['react', 'next'],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@cspell/spellchecker': ['error', { checkComments: false, autoFix: true }],
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@mui/*/*/*', '!@mui/material/test-utils/*'],
      },
    ],
    // Add any other custom ESLint rules here
  },
};
