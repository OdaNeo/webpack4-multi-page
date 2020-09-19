function _rem() {
  var resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize'
  function a() {
    var b = document.documentElement.clientWidth || document.body.clientWidth
    var c = (b / 1920) * 50
    document.querySelector('html').style.fontSize = c + 'px'
  }
  // 增加了html完全加载、手机横屏事件的监听
  window.addEventListener(resizeEvent, a, false)
  document.addEventListener('DOMContentLoaded', a, false)
}
_rem()
