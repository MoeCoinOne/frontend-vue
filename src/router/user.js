const Login = () => import('@/layouts/user/login.vue')

export default [
  {
    path: '/user/login',
    name: 'UserLogin',
    component: Login
  }
]
