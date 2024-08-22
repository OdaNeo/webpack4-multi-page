// 空fiber
let nextUnitOfWork = null
let wipRoot = null

/* 
  <div>
    <h1>
      <p></p>
      <a></a>
    </h1>
    <h2></h2>
  </div>
*/

function performUnitOfWork(fiber) {
  //执行任务单元 虚拟dom转化成真实dom
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  //为当前fiber创建子节点fiber
  //parent child sibling
  let prevSibling = null

  const elements = fiber?.props?.children
  elements?.forEach((childrenElements, index) => {
    const newFiber = {
      parent: fiber,
      props: childrenElements.props,
      type: childrenElements.type,
      dom: null
    }
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
  })
  //return下一个单元
  if (fiber.child) {
    return fiber.child
  }
  // 到底
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}

function commitWork(fiber) {
  if (!fiber) {
    return
  }
  const domParent = fiber.parent.dom
  domParent.appendChild(fiber.dom)
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function commitRoot() {
  // 渲染真实Dom
  commitWork(wipRoot.child)
  wipRoot = null
}

function workLoop(deadLine) {
  let shouldYield = true // 是否有空余时间

  while (shouldYield && nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadLine.timeRemaining() > 1
  }
  //全部渲染完成，一次性提交fiberTree
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function createDom(element) {
  const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type)

  Object.keys(element?.props)
    .filter((key) => key !== 'children')
    .forEach((name) => (dom[name] = element.props[name]))

  return dom
}

function render(element, container) {
  // 创建根节点
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    }
  }
  nextUnitOfWork = wipRoot
}

export { render }
