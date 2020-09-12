module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage', // 自动引入项目使用的polyfill
        corejs: 3
      }
    ]
  ],
  plugins: []
}
