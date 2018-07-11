const Login = () => import('@/layouts/user/login.vue')
const Register = () => import('@/layouts/user/register.vue')
const Forget = () => import('@/layouts/user/forget.vue')

export default [
  {
    path: '/user/login',
    name: 'UserLogin',
    component: Login
  },
  {
    path: '/user/register',
    name: 'UserRegister',
    component: Register
  },
  {
    path: '/user/forget',
    name: 'UserForget',
    component: Forget
  }
]
