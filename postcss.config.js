module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-px2rem')({
      remUnit: 50, // 50px = 1rem
      remPrecision: 2 // rem的小数点后位数
    })
  ]
}
