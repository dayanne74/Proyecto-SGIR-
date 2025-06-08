// jest.config.js
export default {
  // 1. Usa babel-jest para transformar todos los .js
  transform: {
    '^.+\\.js$': 'babel-jest'
  },

  // 2. No necesitamos moduleNameMapper para los .js importados
  // (Babel se encarga de resolverlos)

  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testTimeout: 30000,

  moduleFileExtensions: ['js', 'json', 'node'],

  collectCoverageFrom: [
    'controllers/**/*.js',
    'models/**/*.js',
    'middleware/**/*.js',
    '!**/node_modules/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html']
};
