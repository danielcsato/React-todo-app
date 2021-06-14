module.exports = {
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/styleMock.js',
  },
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
};
