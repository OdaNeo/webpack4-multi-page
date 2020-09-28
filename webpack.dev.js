const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 从js中提取css

console.log(process.env.NODE_ENV) // 需要安装cross-env并配置script

module.exports = merge(common, {
  mode: 'development',
  output: {
    // 多出口 dev环境下不启用hash
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 7863,
    open: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // HMR
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(css|styl)$/, // css-loader
        exclude: [/dist/],
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // dev环境下开启hmr
            options: {
              hmr: true,
              reloadAll: true
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-px2rem')({
                    remUnit: 50, // 50px = 1rem
                    remPrecision: 2 // rem的小数点后位数
                  })
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        exclude: [/node_modules/, /dist/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[path][name].[ext]' // [path]===/src/assets/img/
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: [resolve('src/styles/font')],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /dist/],
        use: 'eslint-loader'
      }
    ]
  }
})
