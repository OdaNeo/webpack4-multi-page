const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const glob = require('glob') // glob 动态生成entry与html模板
const pagesName = glob.sync('src/pages/*') // [ 'src/pages/index', 'src/pages/page1', 'src/pages/page2' ]
const entryFile = {}
const htmlFile = []

for (const i of pagesName) {
  const _name = i.split('/').pop().toString()
  entryFile[_name] = `./src/pages/${_name}/app.js`
  htmlFile.push(
    new HtmlWebpackPlugin({
      filename: `${_name}.html`,
      template: resolve(`src/pages/${_name}/index.html`),
      chunks: [`${_name}`]
    })
  )
}

module.exports = {
  entry: entryFile,
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
  plugins: htmlFile.concat([
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'static', // static目录下静态资源不打包
          to: 'static'
        }
      ]
    })
  ])
}
