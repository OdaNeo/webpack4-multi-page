import '@/styles/page1.css' // import css
import { createElement } from './createElement'
import { render } from './render'

/* 
  <div>
    <h1>
      <p></p>
      <a></a>
    </h1>
    <h2></h2>
  </div>
*/

const element = createElement(
  'div',
  {
    title: 'hello',
    id: 'sky'
  },
  createElement('h1', {}, createElement('p', {}, '我是P'), createElement('a', {}, '我是A')),
  createElement('h2', null, '我是H2')
)

const container = document.querySelector('#root')

render(element, container)

if (module.hot) {
  module.hot.accept()
}
