// 空fiber
let nextUnitOfWork = null
let wipRoot = null
let currentRoot = null // 上一次提交的fiber
let deletions = []

/* 
  <div>
    <h1>
      <p></p>
      <a></a>
    </h1>
    <h2></h2>
  </div>
*/

function reconcileChildren(wipFiber, elements) {
  let index = 0
  let prevSibling = null
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child
  while (index < elements?.length || !!oldFiber) {
    const childrenElement = elements[index]
    let newFiber = null
    const sameType = oldFiber && childrenElement && childrenElement.type === oldFiber.type

    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: childrenElement.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE'
      }
    }

    if (!sameType && childrenElement) {
      newFiber = {
        type: childrenElement.type,
        props: childrenElement.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: 'PLACEMENT'
      }
    }

    if (!sameType && oldFiber) {
      oldFiber.effectTag = 'DELETION'
      deletions.push(oldFiber)
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    if (index === 0) {
      wipFiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }
}

function performUnitOfWork(fiber) {
  //执行任务单元 虚拟dom转化成真实dom
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  //为当前fiber创建子节点fiber
  //parent child sibling

  const elements = fiber?.props?.children
  reconcileChildren(fiber, elements)

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
// 筛选出事件
const isEvent = (key) => key.startsWith('on')
const isProperty = (key) => key !== 'children' && !isEvent(key)
// 筛选出要移除的属性
const isGone = (prev, next) => (key) => !(key in next)
// 挑选出新的属性
const isNew = (prev, next) => (key) => prev[key] !== next[key]

function updateDom(dom, prevProps, nextProps) {
  //移除掉旧的监听事件
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => isGone(prevProps, nextProps)(key) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLocaleLowerCase().substring(2)
      dom.removeEventListener(eventType, prevProps[name])
    })
  //移除掉不存在新的props
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => (dom[name] = ''))
  // 新增
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => (dom[name] = nextProps[name]))
  // 新增事件
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLocaleLowerCase().substring(2)
      dom.addEventListener(eventType, nextProps[name])
    })
}

function commitWork(fiber) {
  if (!fiber) {
    return
  }
  const domParent = fiber.parent.dom
  switch (fiber.effectTag) {
    case 'PLACEMENT':
      !!fiber.dom && domParent.appendChild(fiber.dom)
      break
    case 'UPDATE':
      !!fiber.dom && updateDom(fiber.dom, fiber.alternate, fiber.props)
      break
    case 'DELETION':
      !!fiber.dom && domParent.removeChild(fiber.dom)
      break
    default:
      break
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function commitRoot() {
  // 渲染真实Dom
  commitWork(wipRoot.child)

  deletions.forEach(commitWork)

  currentRoot = wipRoot

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

function createDom(fiber) {
  const dom = fiber.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(fiber.type)

  updateDom(dom, {}, fiber.props)

  return dom
}

function render(element, container) {
  // 创建根节点
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot
  }
  nextUnitOfWork = wipRoot
  deletions = []
}

export { render }
