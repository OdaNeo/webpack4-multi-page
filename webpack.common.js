const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const glob = require('glob') // glob 动态生成entry与html模板
const pagesName = glob.sync('src/pages/*') // [ 'src/pages/index', 'src/pages/page1', 'src/pages/page2' ]
const entryFile = {}
const htmlFile = []

for (const i of pagesName) {
  const _name = i.split('/').pop().toString()
  entryFile[_name] = `./src/pages/${_name}/index.js`
  htmlFile.push(
    new HtmlWebpackPlugin({
      title: `${_name}`,
      filename: `${_name}.html`,
      template: resolve(`src/pages/${_name}/index.html`),
      chunks: [`${_name}`],
      favicon: 'favicon.ico'
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
  performance: false,
  optimization: {
    runtimeChunk: true, // html.js cache
    splitChunks: {
      chunks: 'all', // 异步模块和入口模块
      minSize: 30000
    }
  },
  plugins: [
    ...htmlFile,
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'static', // static目录下静态资源不打包, 直接复制
          to: 'static',
          globOptions: {
            ignore: ['**/.DS_Store', '**/index.html', '**/favicon.ico']
          },
          noErrorOnMissing: true // static如果为空，会报错
        }
      ]
    })
  ],
  module: {
    noParse: /jquery/ // parse ignore module, 使用esModule引入的包不可以加入
  }
}
