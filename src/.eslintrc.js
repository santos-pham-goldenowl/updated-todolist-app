module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "airbnb"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 6,
    sourceType: "module",
  },
  parser: "babel-eslint",
  plugins: ["react", "import"],
  rules: {
    eqeqeq: 1,
    semi: ["error", "always"],
    quotes: [1, "double"],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "no-unused-vars": [0],
    "arrow-parens": [0],
    "no-param-reassign": [0],
    "quote-props": [0],
    indent: [0, "tab"],
    "react/prefer-stateless-function": [0],
    "react/prop-types": [0],
    "react/destructuring-assignment": [0],
    "no-console": [0],
    "no-plusplus": [0],
    "lines-between-class-members": [0],
  },
};
