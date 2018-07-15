const Home = () => import('@/layouts/account/home.vue')
const HomeSubscribes = () => import('@/layouts/account/home/subscribes.vue')
const HomeDynamic = () => import('@/layouts/account/home/dynamic.vue')
const HomeBill = () => import('@/layouts/account/home/bill.vue')

export default [
  {
    path: '/account/home',
    component: Home,
    children: [
      {
        path: 'dynamic',
        alias: '',
        name: 'AccountHomeDynamic',
        component: HomeDynamic
      },
      {
        path: 'subscribes',
        name: 'AccountHomeSubscribes',
        component: HomeSubscribes
      },
      {
        path: 'bill',
        name: 'AccountHomeBill',
        component: HomeBill
      }
    ]
  }
]
