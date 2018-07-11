const Index = () => import('@/layouts/home/index.vue')
const Creator = () => import('@/layouts/home/creator.vue')
const AuthShow = () => import('@/layouts/home/AuthShow.vue')

export default [
  {
    path: '/home/index',
    name: 'HomeIndex',
    component: Index
  },
  {
    path: '/home/creator',
    name: 'HomeCreator',
    component: Creator
  },
  {
    path: '/home/authshow',
    component: AuthShow,
    name: 'auth show'
  }
]
