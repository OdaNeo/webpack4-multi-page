module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'eqeqeq': ['error', 'always', { null: 'ignore' }], // 强制===，除非null
    'no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'none'
      }
    ]
  }
}
