module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false, // 不输出 commonjs，tree shaking有效化
        useBuiltIns: 'usage', // 自动引入项目使用的polyfill
        corejs: 3
      }
    ]
  ],
  plugins: ['@babel/plugin-transform-runtime']
}
