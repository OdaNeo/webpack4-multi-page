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
    publicPath: '/'
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: './dist',
    port: 5050,
    open: true,
    hot: true,
    hotOnly: true,
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
    noParse: /jquery|lodash/, // parse ignore module
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
        test: /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/,
        include: /\\src\\/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        include: /\\src\\/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'media/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        include: /\\src\\/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'fonts/[name].[hash:8].[ext]'
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
