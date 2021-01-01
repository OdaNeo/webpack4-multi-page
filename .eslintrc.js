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
  extends: ['eslint:recommended'],
  rules: {
    'accessor-pairs': 2,
    'arrow-spacing': [
      2,
      {
        'before': true, // 箭头函数前后有一致的空格
        'after': true
      }
    ],
    'block-spacing': [2, 'always'], // 代码块前后空格
    'brace-style': [
      2,
      '1tbs', // 大括号风格，允许开闭括号在同一行
      {
        'allowSingleLine': true
      }
    ],
    'camelcase': [
      0,
      {
        'properties': 'always' // 属性名强制转驼峰
      }
    ],
    'comma-dangle': [2, 'never'], // 禁止拖尾逗号
    'comma-spacing': [
      2,
      {
        'before': false, // 逗号周围的空格
        'after': true
      }
    ],
    'comma-style': [2, 'last'], // 逗号在行末
    'constructor-super': 2, // 继承构造函数中强制引用super
    'curly': [2, 'multi-line'], // 允许单行语句省略大括号，但是多行强制启用
    'dot-location': [2, 'property'], // 点和属性在同一行
    'eol-last': 2, // 文件末尾强制换行lf
    'eqeqeq': ['error', 'always', { 'null': 'ignore' }], // 强制===，除非null
    'generator-star-spacing': [
      2,
      {
        'before': true, // 强制generator * 前后有空格
        'after': true
      }
    ],
    'handle-callback-err': [2, '^(err|error)$'], // 回调函数要有error处理
    'indent': [
      2,
      2,
      {
        'SwitchCase': 1 // 强制缩进2，case缩进1
      }
    ],
    'jsx-quotes': [2, 'prefer-single'], // jsx属性强制单引号
    'key-spacing': [
      2,
      {
        'beforeColon': false, // 字面量冒号前后空格
        'afterColon': true
      }
    ],
    'keyword-spacing': [
      2,
      {
        'before': true, // js关键字前后空格
        'after': true
      }
    ],
    'new-cap': [
      2,
      {
        'newIsCap': true, // 使用new操作符首字母大写
        'capIsNew': false // 允许调用首字母大写的函数时没有 new 操作符
      }
    ],
    'new-parens': 2, // 强制调用无参构造函数时有圆括号
    'no-array-constructor': 2,
    'no-caller': 2,
    'no-console': 'off',
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-const-assign': 2,
    'no-control-regex': 0,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'no-eval': 2,
    'no-ex-assign': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': [2, 'functions'], // function禁止不必不要的圆括号
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [
      2,
      {
        'allowLoop': false, // 禁用label语句
        'allowSwitch': false
      }
    ],
    'no-lone-blocks': 2,
    'no-mixed-spaces-and-tabs': 2, // 禁止空格和 tab 的混合缩进
    'no-multi-spaces': 2, // 禁止多个空格
    'no-multi-str': 2, // 禁用多行字符串
    'no-multiple-empty-lines': [
      2,
      {
        'max': 1 // 最多1行空行
      }
    ],
    'no-global-assign': 2,
    'no-unsafe-negation': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2, // 禁用 __proto__ 属性
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'], // return禁止出现赋值语句，除非使用括号把它们括起来
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-shadow-restricted-names': 2, // 禁止将标识符定义为受限的名字,
    'func-call-spacing': [2, 'never'], // 禁止在函数名和开括号之间有空格
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-trailing-spaces': 2, // 禁止行尾空格
    'no-undef': 2,
    'no-undef-init': 2, // 不允许初始化变量值为 undefined
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [
      2,
      {
        'defaultAssignment': false // 禁止条件表达式作为默认的赋值模式
      }
    ],
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unused-vars': [
      2,
      {
        'vars': 'all', // 禁止未使用过的变量
        'args': 'none' // 不检查参数，参数可以声名但不使用
      }
    ],
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 2, // 禁用不必要的转义
    'no-whitespace-before-property': 2, // 禁止属性前有空白
    'no-with': 2,
    'one-var': [
      2,
      {
        'initialized': 'never' // 作用域的初始化的变量可以有多个变量声明
      }
    ],
    'operator-linebreak': [
      2,
      'after', // 换行符风格，换行符在操作符后面，? : 除外
      {
        'overrides': {
          '?': 'before',
          ':': 'before'
        }
      }
    ],
    'padded-blocks': [2, 'never'], // 禁止块语句和类的开始或末尾有空行
    'quotes': [
      2,
      'single', // 强制使用单引号
      {
        // 'avoidEscape': true, // 字符串除外
        'allowTemplateLiterals': true
      }
    ],
    'semi': [2, 'never'],
    'semi-spacing': [
      2,
      {
        'before': false,
        'after': true
      }
    ],
    'space-before-blocks': [2, 'always'], // 强制语句块之前有空格
    'space-before-function-paren': [
      2,
      {
        'anonymous': 'ignore', // 匿名函数空格忽略
        'named': 'never', // 命名函数无空格
        'asyncArrow': 'always' // 异步箭头函数有空格
      }
    ],
    'space-in-parens': [2, 'never'], // 圆括号前后无空格
    'space-infix-ops': 2, // 中缀操作符周围有空格
    'space-unary-ops': [
      2,
      {
        'words': true, // 单词类一元操作符有空格
        'nonwords': false // 符号类一元操作符无空格
      }
    ],
    'spaced-comment': [
      2,
      'always', // 要求在注释前有空白
      {
        'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
      }
    ],
    'template-curly-spacing': [2, 'never'], //  禁止模板字符串花括号内出现空格
    'use-isnan': 2,
    'valid-typeof': 2,
    'wrap-iife': [2, 'any'], // 立即执行函数需要括号包裹，任何形式都可以
    'yield-star-spacing': [2, 'both'],
    'yoda': [2, 'never'], // 禁止yoda
    'prefer-const': 2,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-curly-spacing': [2, 'always'], // 强制在花括号中使用一致的空格
    'array-bracket-spacing': [2, 'never'] // 禁止在数组括号内出现空格
  }
}
