let count = 1
const container = document.getElementById('container')

function getUserAction(e) {
  console.log(this)
  console.log(e)
  container.innerHTML = count++
}

// eslint-disable-next-line no-unused-vars
function debounce(func, wait) {
  let timeout
  return function () {
    func = func.bind(this)
    const args = arguments

    clearTimeout(timeout)

    timeout = setTimeout(function () {
      func(args)
    }, wait)
  }
}

function throttle(func, wait) {
  let previous = 0

  return function () {
    const now = +new Date()
    func = func.bind(this)
    const args = arguments

    if (now - previous > wait) {
      func(args)
      previous = now
    }
  }
}

container.onmousemove = throttle(getUserAction, 1000)
