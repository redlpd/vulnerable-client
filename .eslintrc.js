module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended'
  ],
  settings: {
    react: { version: '17.0.2' }
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "jsx-a11y/label-has-associated-control": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "react/jsx-props-no-spreading": 0,
    "react/react-in-jsx-scope": "off",
    "react/prop-types": 0
  },
}
