module.exports = {
  root: true, // stop looking in parent folders
  /* defines global variables that are predefined for target env */
  env: {
    browser: true,
    node: true,
    es2020: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "react"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  settings: {
    react: {
      version: "detect", // picks the version installed, default using latest version
    },
  },
  rules: {
    "max-len": [
      "error",
      {
        code: 150,
        tabWidth: 2,
      },
    ],
  },
};
