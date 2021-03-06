const Home = () => import('@/layouts/account/home.vue')
const HomeSubscribes = () => import('@/layouts/account/home/subscribes.vue')
const HomeDynamic = () => import('@/layouts/account/home/dynamic.vue')
const HomeBill = () => import('@/layouts/account/home/bill.vue')

const Setting = () => import('@/layouts/account/setting.vue')
const SettingProfile = () => import('@/layouts/account/setting/profile.vue')
const SettingSafe = () => import('@/layouts/account/setting/safe.vue')

export default [
  {
    path: '/account/home',
    component: Home,
    children: [
      {
        path: 'dynamic',
        name: 'AccountHomeDynamic',
        component: HomeDynamic
      },
      {
        path: 'subscribes',
        alias: '',
        name: 'AccountHomeSubscribes',
        component: HomeSubscribes
      },
      {
        path: 'bill',
        name: 'AccountHomeBill',
        component: HomeBill
      }
    ]
  },
  {
    path: '/account/setting',
    component: Setting,
    children: [
      {
        path: 'profile',
        alias: '',
        name: 'AccountSettingProfile',
        component: SettingProfile
      },
      {
        path: 'safe',
        name: 'AccountSettingSafe',
        component: SettingSafe
      }
    ]
  }
]
