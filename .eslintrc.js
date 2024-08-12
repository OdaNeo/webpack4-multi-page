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
  //eslint-plugin-import 可以静态检出引入的包是否存在，需要搭配eslint-import-resolver-webpack，赋予@含义
  extends: ['eslint:recommended', 'plugin:import/recommended', 'plugin:prettier/recommended'],
  rules: {
    'import/named': 'error',
    'import/default': 'error',
    'import/namespace': 'error',
    'import/no-unresolved': ['error', { commonjs: true, amd: true }],
    'eqeqeq': ['error', 'always', { null: 'ignore' }], // 强制===，除非null
    'no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'none'
      }
    ]
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack.common.js'
      }
    }
  }
}
