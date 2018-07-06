import App from '../App'
//  按需加载
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const base = r => require.ensure([], () => r(require('../page/base/base')), 'base')

export default[
  {
    path : '/',
    component : App,
    children : [
      {
        path: '/',
        redirect: '/home'
      }, {
        path: '/home',
        component: home
      }, {
        path: '/base',
        component: base
      }
    ]
  }
]

 