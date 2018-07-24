const Index = () => import('@/layouts/home/index.vue')
const Explore = () => import('@/layouts/home/explore.vue')
const Pay = () => import('@/layouts/home/pay.vue')
const Creator = () => import('@/layouts/home/creator.vue')
const CreatorIndex = () => import('@/layouts/home/creator/index.vue')
const CreatorSponsor = () => import('@/layouts/home/creator/sponsor.vue')

export default [
  {
    path: '/home/index',
    name: 'HomeIndex',
    component: Index
  },
  {
    path: '/home/explore',
    name: 'HomeExplore',
    component: Explore
  },
  {
    path: '/home/pay',
    name: 'HomePay',
    component: Pay
  },
  {
    path: '/c/:id',
    alias: '/home/creator/:id',
    component: Creator,
    children: [
      {
        path: '',
        name: 'HomeCreatorIndex',
        component: CreatorIndex
      },
      {
        path: 'sponsor',
        name: 'HomeCreatorSponsor',
        component: CreatorSponsor
      }
    ]
  }
]
