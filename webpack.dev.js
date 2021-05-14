const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: resolve('dist'), // default
    publicPath: ''
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: './dist',
    port: 5050,
    open: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  stats: 'errors-only', // friendly-errors-webpack-plugin
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // HMR
    new FriendlyErrorsWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/, // css-loader
        include: /\\src\\/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1 // setups number of loaders applied before CSS loader, enable to import tailwind-css-file from tailwind-css-file
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [
                  require('tailwindcss'),
                  require('postcss-px2rem')({
                    remUnit: 16, // 16px = 1rem
                    remPrecision: 2 // rem
                  })
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        include: /\\src\\/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[path][name].[ext]' // [path]:/src/assets/img/ 添加path可以防止文件名重复
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: /\\src\\/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.js$/,
        include: /\\src\\/,
        use: 'eslint-loader'
      }
    ]
  }
})
