export default {
  transform: {},
  testMatch: ['**/tests/**/*.test.mjs'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
