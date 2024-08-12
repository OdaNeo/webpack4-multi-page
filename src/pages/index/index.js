import '@/styles/index.css' // import css
import getComponent from './async'

import _, { differenceBy } from 'lodash-es'
import { add } from './math.js'

console.log(_.join(['a', 'b', 'c'], '***'))

add(1, 2)

const arr = differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x')
// const arr2 = chunk(['a', 'b', 'c', 'd'], 2)
console.log(arr)

document.addEventListener('click', () => {
  getComponent().then((element) => {
    document.body.appendChild(element)
  })
})

if (module.hot) {
  module.hot.accept()
}
