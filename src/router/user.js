const Login = () => import('@/layouts/user/login.vue')
const Register = () => import('@/layouts/user/register.vue')
const Forget = () => import('@/layouts/user/forget.vue')
const ConfirmMail = () => import('@/layouts/user/confirmMail.vue')
const Index = () => import('@/layouts/user/index.vue')
const AuthShow = () => import('@/layouts/user/authShow.vue')

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
  },
  {
    path: '/user/confirm_mail',
    name: 'UserConfirmMail',
    component: ConfirmMail
  },
  {
    path: '/user/index',
    name: 'UserIndex',
    component: Index
  },
  {
    path: '/user/authshow',
    component: AuthShow,
    name: 'auth show'
  }
]
