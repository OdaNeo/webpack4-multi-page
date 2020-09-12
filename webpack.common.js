const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    // 多入口
    index: './src/pages/index/app.js',
    page1: './src/pages/index/app.js',
    page2: './src/pages/index/app.js'
  },
  resolve: {
    alias: {
      '@': resolve('src') // 配置别名
    }
  },
  optimization: {
    namedModules: true // 替代 NamedModulesPlugin
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: [/node_modules/, /dist/],
        use: ['html-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: [/node_modules/, /dist/],
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // 清理dist目录
    // 配置多页面html模板
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('src/pages/index/index.html'),
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'page1.html',
      template: resolve('src/pages/page1/index.html'),
      chunks: ['page1']
    }),
    new HtmlWebpackPlugin({
      filename: 'page2.html',
      template: resolve('src/pages/page2/index.html'),
      chunks: ['page2']
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'static', // static目录下静态资源不打包
          to: 'static'
        }
      ]
    })
  ]
}
