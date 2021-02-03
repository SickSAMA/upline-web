module.exports = {
  roots: ['<rootDir>/src/', '<rootDir>/test'],
  /* only test files with a suffix of .test or .spec */
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/test/**'],
  coverageDirectory: '<rootDir>/test/coverage',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(css|sass|scss)$': '<rootDir>/test/configs/styleMock.js',
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/configs/fileMock.js',
    '^@/(.*)': '<rootDir>/src/$1', // path alias to align with Next setup
  },
  setupFilesAfterEnv: ['<rootDir>/test/configs/setupEnzyme.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  snapshotResolver: '<rootDir>/test/configs/snapshotResolver.js',
};
