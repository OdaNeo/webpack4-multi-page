//  根据pathname，设置document.title
let pathname = location.pathname
let _path = pathname.slice(1).split('.')[0]
let title = undefined
switch (_path) {
  case 'index':
    title = '首页'
    break
  default:
    title = 'Document'
}
document.title = title
