const getComponent = async () => {
  const { default: _ } = await import(/* webpackChunkName:"lodash1" */ 'lodash-es')
  const element = document.createElement('div')
  element.innerHTML = _.join(['Hello', 'Darrell'], '-')
  return element
}

export default getComponent
