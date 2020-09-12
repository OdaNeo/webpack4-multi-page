// 引入公共组件，挂载到对应的dom元素上
const headerHTML = document.querySelector('#header')
const footerHTML = document.querySelector('#footer')
headerHTML.innerHTML = require('@/components/header.html')
footerHTML.innerHTML = require('@/components/footer.html')
