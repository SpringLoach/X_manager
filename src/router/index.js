import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('@/views/login/Login.vue')
const Home = () => import('@/views/home/Home')
const MainShow = () => import('@/views/home/childComps/maincontent/MainShow')
const Users = () => import('@/views/home/childComps/maincontent/users/Users')
const Rights = () => import('@/views/home/childComps/maincontent/rights/Rights')
const Roles = () => import('@/views/home/childComps/maincontent/roles/Roles')
const Cate = () => import('@/views/home/childComps/maincontent/goodscategories/Cate')
const Params = () => import('@/views/home/childComps/maincontent/params/Params')
const Goods = () => import('@/views/home/childComps/maincontent/goods/Goods')
const AddGoods = () => import('@/views/home/childComps/maincontent/goods/AddGoods')
const Orders = () => import('@/views/home/childComps/maincontent/orders/Orders')
const Reports = () => import('@/views/home/childComps/maincontent/reports/Reports')

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      {path: '/', redirect: '/home/mainshow'},
      {path: '/home/mainshow',component: MainShow},
      {path: '/home/users',component: Users},
      {path: '/home/rights',component: Rights},
      {path: '/home/roles',component: Roles},
      {path: '/home/categories',component: Cate},
      {path: '/home/params',component: Params},
      {path: '/home/goods',component: Goods},
      {path: '/home/goods/add',component: AddGoods},
      {path: '/home/orders',component: Orders},
      {path: '/home/reports',component: Reports}
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  /*base: process.env.BASE_URL,*/
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {return next()};
  const State = window.sessionStorage.getItem('token');
  if (State) {
    return next()
  } else {
    next('/login')
  }
})

export default router
