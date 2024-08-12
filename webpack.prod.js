const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin') // inline runtime to html，to reduce http-request
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 从js中提取css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // cssnano
const TerserJSPlugin = require('terser-webpack-plugin') // 压缩js代码

const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin') // image minimizer
// const CompressionPlugin = require('compression-webpack-plugin') // gzip
// const PurgecssPlugin = require('purgecss-webpack-plugin') // css tree shaking : already included by tailwind

module.exports = merge(common, {
  mode: 'production', //
  output: {
    publicPath: '/',
    path: resolve('dist'), // default
    filename: 'js/[name].[contenthash:8].js', // output path, [name]_[-hash] from prod environment
    chunkFilename: 'js/[name].[contenthash:8].chunk.js' // chunkFilename for no-enter chunk-file
  },
  devtool: 'hidden-source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserJSPlugin({
        cache: true
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }] // cssnano
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css', // prod contenthash
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: /runtime~.*\.js/ // inline runtimeChunk to html
    })
    // new PurgecssPlugin({
    //   paths: glob.sync(`src/**/*`, { nodir: true })
    // }),
    // new CompressionPlugin({
    //   test: /\.(js|css)$/i,
    //   algorithm: 'gzip',
    //   deleteOriginalAssets: true
    // })
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
              esModule: true // tree shaking
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
                plugins: [
                  require('autoprefixer'),
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
              // publicPath: '../img'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              },
              imageminSvgo: {
                plugins: [{ removeViewBox: false }]
              }
            }
          },
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              severityError: 'warning', // Ignore errors on corrupted images
              minimizerOptions: {
                plugins: [
                  ['gifsicle', { interlaced: true }],
                  ['mozjpeg', { progressive: true, quality: 50 }],
                  ['pngquant', { quality: [0.65, 0.75], speed: 4 }],
                  [
                    'svgo',
                    {
                      plugins: [
                        {
                          removeViewBox: false
                        }
                      ]
                    }
                  ]
                ]
              }
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
              // publicPath: '../fonts'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /dist/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true // 开启缓存
            }
          }
        ]
      }
    ]
  }
})
