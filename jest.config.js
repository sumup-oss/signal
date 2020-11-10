module.exports = {
  roots: ['./src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  collectCoverageFrom: ['src/**/**/*.ts', `!src/index.d.ts`, `!src/types.d.ts`]
};

