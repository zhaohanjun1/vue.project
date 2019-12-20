import Msite from '@/pages/Msite/Msite.vue'
import Search from '@/pages/Search/Search.vue'
import Order from '@/pages/Order/Order.vue'
import Profile from '@/pages/Profile/Profile.vue'
import Login from '@/pages/Login/Login.vue'
import Shop from '@/pages/Shop/Shop.vue'
import Goods from '@/pages/Shop/Goods'
import Ratings from '@/pages/Shop/Ratings'
import Info from '@/pages/Shop/Info'

export default [
  {
    path:'/msite',
    component: Msite,
    meta: {
      isShowFooter: true
    }
  },
  {
    path:'/search',
    component: Search,
    meta: {
      isShowFooter: true
    }
  },
  {
    path:'/order',
    component: Order,
    meta: {
      isShowFooter: true
    }
  },
  {
    path:'/profile',
    component: Profile,
    meta: {
      isShowFooter: true
    }
  },
  {
    path:'/login',
    component: Login
  },
  {
    path:'/shop',
    component: Shop,
    children:[
      {
        path:'/shop/goods',
        component: Goods
      },
      {
        path:'ratings',
        component: Ratings
      },
      {
        path:'/shop/info',
        component: Info
      },
      {
        path: '',
        redirect: '/shop/goods'
      }
    ]
  },
  {
    path:'/',
    redirect:'/msite'
  }
]

