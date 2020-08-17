module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['react-app', 'prettier', 'prettier/@typescript-eslint'],
  plugins: ['@typescript-eslint', 'prettier'],
  env: {
    browser: true,
    node: true
  },
  settings: {
    "react": { //发现React的版本，从而进行规范react代码
      "program": "React",
      "version": "16.13"
    }
  },
  parserOptions: { //指定eslint可以解析jsx语法
    "ecmaVersion": 2019,
    "sourceType": 'module',
    "ecmaFeatures": {
      jsx: true
    }
  },
  rules: {
    'react/display-name': 0,
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'react/prop-types': 'off',
    'no-console': 'error',
    'no-unused-vars': 'error'
  }
}