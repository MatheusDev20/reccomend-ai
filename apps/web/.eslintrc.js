/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  plugins: ["@tanstack/eslint-plugin-query"],
  parserOptions: {
    project: true,
  },
  ignorePatterns: ['*.js']
};
