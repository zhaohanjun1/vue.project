import Msite from '@/pages/Msite/Msite.vue'
import Search from '@/pages/Search/Search.vue'
import Order from '@/pages/Order/Order.vue'
import Profile from '@/pages/Profile/Profile.vue'

export default [
  {
    path:'/msite',
    component: Msite
  },
  {
    path:'/search',
    component: Search
  },
  {
    path:'/order',
    component: Order
  },
  {
    path:'/profile',
    component: Profile
  },
  {
    path:'/',
    redirect:'/msite'
  }
]

