module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    eqeqeq: "off",
    curly: "error",
    semi: 1,
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    quotes: ["error", "double"],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "arrow-body-style": ["error", "always"],
      "react/function-component-definition": [
        "error",
        {
            "namedComponents": "arrow-function",
            "unnamedComponents": "arrow-function"
        }
    ]
  },
};
