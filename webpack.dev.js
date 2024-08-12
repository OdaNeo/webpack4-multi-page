const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 从js中提取css

module.exports = merge(common, {
  mode: 'development',
  output: {
    publicPath: '/',
    path: resolve('dist'), // default
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js' // chunkFilename for no-enter chunk-file
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    clientLogLevel: 'error', // 浏览器控制台输出
    contentBase: path.join(__dirname, 'dist'),
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].chunk.css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new webpack.HotModuleReplacementPlugin(), // HMR
    new FriendlyErrorsWebpackPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.css$/, // css-loader
        include: /\\src\\/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true
            }
          },
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
              name: 'img/[name].[ext]'
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
              name: 'media/[name].[ext]'
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
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        include: /\\src\\/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader', // 影响开发环境下 eslint 在终端的输出
            options: {
              enforce: 'pre' // 确保 ESLint 在 babel-loader 之前运行
            }
          }
        ]
      }
    ]
  }
})
