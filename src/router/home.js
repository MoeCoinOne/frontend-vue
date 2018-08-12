const Index = () => import('@/layouts/home/index.vue')
const Explore = () => import('@/layouts/home/explore.vue')
const Pay = () => import('@/layouts/home/pay.vue')
const Creator = () => import('@/layouts/home/creator.vue')
const CreatorIndex = () => import('@/layouts/home/creator/index.vue')
const CreatorPosts = () => import('@/layouts/home/creator/posts.vue')
const CreatorPost = () => import('@/layouts/home/creator/post.vue')
const CreatorSponsor = () => import('@/layouts/home/creator/sponsor.vue')
const CreatorSetting = () => import('@/layouts/home/creator/setting.vue')
const CreatorSettingSubscription = () => import('@/layouts/home/creator/setting/subscription.vue')
const CreatorSettingProfile = () => import('@/layouts/home/creator/setting/profile.vue')

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
        path: 'posts',
        name: 'HomeCreatorPosts',
        component: CreatorPosts
      },
      {
        path: 'post/:postid',
        name: 'HomeCreatorPost',
        component: CreatorPost
      },
      {
        path: 'sponsor',
        name: 'HomeCreatorSponsor',
        component: CreatorSponsor
      },
      {
        path: 'setting',
        component: CreatorSetting,
        children: [
          {
            path: 'profile',
            alias: '',
            name: 'HomeCreatorSettingProfile',
            component: CreatorSettingProfile
          },
          {
            path: 'subscription',
            name: 'HomeCreatorSettingSubscription',
            component: CreatorSettingSubscription
          }
        ]
      }
    ]
  }
]
