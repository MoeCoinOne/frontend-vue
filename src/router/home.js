const Index = () => import('@/layouts/home/index.vue')
const Creator = () => import('@/layouts/home/creator.vue')

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
  }
]
