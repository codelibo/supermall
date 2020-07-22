import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Category = () => import('../views/category/Category.vue')
const Cart = () => import('../views/cart/Cart.vue')
const My = () => import('../views/my/My.vue')
const Detail = () => import('../views/detail/Detail.vue')
const NotFoundComponent = () => import('../views/notfind/NotFoundComponent')


//安装插件
Vue.use(VueRouter)
//创建路由对象
const routes = [
  {
    path:'',
    redirect:'/home'
  },
  { path: '/404', 
    component: NotFoundComponent 
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/my',
    component:My
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
]
const router = new VueRouter({
  routes,
  mode:'history'
})

export default router