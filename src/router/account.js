const Home = () => import('@/layouts/account/home.vue')
const HomeIndex = () => import('@/layouts/account/home/index.vue')
const HomeDynamic = () => import('@/layouts/account/home/dynamic.vue')

export default [
  {
    path: '/account/home',
    component: Home,
    children: [
      {
        path: '',
        name: 'AccountHomeIndex',
        component: HomeIndex
      },
      {
        path: 'dynamic',
        name: 'AccountHomeDynamic',
        component: HomeDynamic
      }
    ]
  }
]
