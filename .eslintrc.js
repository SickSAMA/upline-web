module.exports = {
  root: true, // stop looking in parent folders
  /* defines global variables that are predefined for target env */
  env: {
    browser: true,
    node: true,
    es2020: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'google',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: 'detect', // picks the version installed, default using latest version
    },
  },
  rules: {
    'array-bracket-newline': ['error', 'consistent'],
    'array-element-newline': 'off',
    'object-curly-spacing': ['error', 'always'],
    'require-jsdoc': 'off',
    'new-cap': ['error', { capIsNew: false }],
    'max-len': [
      'error',
      150,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    '@typescript-eslint/no-empty-function': 'off',
    'valid-jsdoc': 'off',
    'react/prop-types': 'off', // https://github.com/yannickcr/eslint-plugin-react/issues/2353
  },
};
