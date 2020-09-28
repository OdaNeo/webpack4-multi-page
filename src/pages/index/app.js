import '@/styles/index.css' // 页面样式引入

import '@/utils/index.js' // 公共方法引入

import IMG from '@/assets/img/jj-ying-DYHx6h3lMdY-unsplash@2x.png'

var IMG_NODE = new Image()
var MAIN = document.querySelector('#main')

IMG_NODE.src = IMG

MAIN.appendChild(IMG_NODE)
