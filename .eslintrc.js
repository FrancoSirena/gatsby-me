module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    `react-app`,
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "react"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "react/prop-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
  },
}
