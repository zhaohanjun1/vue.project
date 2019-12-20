/*
包含N个直接更新状态数据属性的方法的对象
方法可以包含异步和逻辑处理代码
*/
import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqAutoLogin,
  reqGoods,
  reqRatings,
  reqInfo
} from '@/api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_TOKEN,
  RECEIVE_USER,
  RESET_USER,
  RESET_TOKEN,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS

} from './mutation-types'

export default{
  /*
  获取当前地址信息对象的异步action
  */
  async getAddress({commit,state}){
    const {longitude, latitude} = state
    //发异步请求
    const result = await reqAddress(longitude,latitude)
    //请求成功后，提交给mutation
    if(result.code===0){
      const address = result.data
      commit(RECEIVE_ADDRESS,address)
    }
  },
  /*
  保存用户
  */
  saveUser({commit},user){
    const token = user.token
    //将token保存local
    localStorage.setItem('token_key',token)

    delete user.token //删除user内部的token
    
    //将token保存到state
    commit(RECEIVE_USER,{user})
    //将user保存到state
    commit(RECEIVE_TOKEN,{token})

  },

  async autoLogin({commit, state}){

    if (state.token && !state.user._id) {
      const result = await reqAutoLogin()
      console.log(result);
      
      if (result.code===0) {
        const user = result.data
        commit(RECEIVE_USER,{user})
      }
    }
  
  },

  logout({commit}){
    localStorage.removeItem('token_key')
    commit(RESET_USER)
    commit(RESET_TOKEN)
  },
  // 异步获取商家信息
  async getShopInfo({commit}, cb) {
    const result = await reqInfo()
    if(result.code===0) {
      const info = result.data
      info.score = 3.5
      commit(RECEIVE_INFO, {info})

      typeof cb==='function' && cb()
    }
  },

  // 异步获取商家评价列表
  async getShopRatings({commit}, cb) {
    const result = await reqRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})

      typeof cb==='function' && cb()
    }
  },

  // 异步获取商家商品列表
  async getShopGoods({commit}, cb) {
    const result = await reqGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
      typeof cb==='function' && cb()
    }
  },




  /*
  获取商品分类数组的异步action
  */
  async getCategorys({commit}, callback){
    //发异步请求
    const result = await reqCategorys()
    //请求成功后，提交给mutation
    if(result.code===0){
      const categorys = result.data
      commit(RECEIVE_CATEGORYS,categorys)
      typeof callback === 'function' && callback()
  }
},
  /*
  获取商家数组的异步action
  */
  async getShops({commit,state}){
    const {longitude,latitude} = state
    //发异步请求
    const result = await reqShops({longitude,latitude})
    //请求成功后，提交给mutation
    if(result.code===0){
      const shops = result.data
      commit(RECEIVE_SHOPS,shops)
    }
}
}