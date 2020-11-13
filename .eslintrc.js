module.exports = require('@sumup/foundry/eslint')(
  {
    language: 'TypeScript',
    environments: ['Browser'],
    frameworks: ['Jest'],
    openSource: true,
  },
  {
    rules: {
      'no-underscore-dangle': 'off',
      'wrap-iife': 'off',
      '@typescript-eslint/prefer-regexp-exec': 'off',
    },
  },
);
