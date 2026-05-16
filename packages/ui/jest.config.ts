import { Config } from 'jest';

const jestConfig: Config = {
  clearMocks: true,
  restoreMocks: true,
  preset: 'jest-preset-angular',
  transform: {
    '^.+\\.(ts|js|mjs|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverageFrom: [
    'src/lib/**/*.{ts,html}',
    '!src/lib/**/*.stories.ts',
    '!src/lib/**/*.spec.ts',
    '!src/lib/icons/**',
  ],
  coverageReporters: ['text-summary', 'lcov'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 60,
      functions: 80,
      lines: 80,
    },
  },
};

export default jestConfig;
