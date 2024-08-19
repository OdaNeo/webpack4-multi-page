import '@/styles/page1.css' // import css
import { createElement } from './createElement'
import { render } from './render'

const element = createElement(
  'div',
  {
    title: 'hello',
    id: 'sky'
  },
  '我是TEXT_ELEMENT',
  createElement('a', null, 'A标签')
)

const container = document.querySelector('#root')

render(element, container)

if (module.hot) {
  module.hot.accept()
}
