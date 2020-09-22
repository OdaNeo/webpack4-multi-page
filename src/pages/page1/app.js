import 'normalize.css/normalize.css'

import '@/styles/font/font.css'

import '@/styles/index.styl' // 页面样式引入

import '@/utils/index.js' // 公共方法引入

process.env.NODE_ENV === 'development' && require('./app.html') // 热更新HtmlWebpackPlugin
