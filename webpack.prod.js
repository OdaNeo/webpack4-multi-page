const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin') // runtime内联到html文件中，减少http请求
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 从js中提取css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // cssnano
const TerserJSPlugin = require('terser-webpack-plugin') // 压缩js代码
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin') // 图片压缩

// const CompressionPlugin = require('compression-webpack-plugin') // gzip
// const PurgecssPlugin = require('purgecss-webpack-plugin') // css tree shaking : already included by tailwind

module.exports = merge(common, {
  mode: 'production', // 防止控制台报错
  output: {
    // 多出口 prod环境下启用contenthash
    filename: 'js/[name]_[contenthash:8].bundle.js',
    path: resolve('dist'),
    publicPath: ''
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        cache: true, // 开启缓存
        terserOptions: {
          compress: {
            drop_console: true // 移除console
          },
          output: {
            comments: false // 移除js中的注释
          }
        }
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }] // 开启cssnano
        }
      })
    ],
    runtimeChunk: true, // 防止app.js缓存失效
    splitChunks: {
      chunks: 'all', // 异步模块和入口模块
      minSize: 30000,
      minChunks: 1, // 最少有多少chunks共用的模块
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1,
          priority: 20 // 权重
        },
        default: {
          name: 'default',
          test: /\\src\\utils\\/,
          minChunks: 1,
          priority: 10,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:8].css' // prod启用contenthash
      // chunkFilename: 'css/[name]_[contenthash:8].chunk.css'
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: /runtime~.*\.js$/ // 内联runtimeChunk到html
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
        test: /\.(css|styl)$/, // css-loader
        exclude: [/node_modules/, /dist/],
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer'),
                  require('tailwindcss'),
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
              outputPath: '/img/',
              name: '[emoji][emoji][name]_[contenthash:8].[ext]'
              // publicPath: '../img'
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
          // {
          //   loader: 'image-webpack-loader',
          //   options: {
          //     mozjpeg: {
          //       // progressive 先加载模糊图片 baseline 从上到下刷新
          //       progressive: true
          //     },
          //     // optipng.enabled: false will disable optipng
          //     optipng: {
          //       enabled: false
          //     },
          //     pngquant: {
          //       quality: [0.65, 0.9],
          //       speed: 4
          //     },
          //     gifsicle: {
          //       interlaced: false
          //     },
          //     webp: {
          //       quality: 75
          //     },
          //     imageminSvgo: {
          //       plugins: [{ removeViewBox: false }]
          //     }
          //   }
          // }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: resolve('src/styles/font'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: '/css/font/',
              name: '[name].[ext]'
              // publicPath: '../css/font'
            }
          }
        ]
      },
      {
        enforce: 'pre', // 保证 eslint 优先 babel 执行
        test: /\.js$/,
        exclude: [/node_modules/, /dist/],
        use: 'eslint-loader'
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
