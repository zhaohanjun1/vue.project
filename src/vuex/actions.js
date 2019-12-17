/*
包含N个直接更新状态数据属性的方法的对象
方法可以包含异步和逻辑处理代码
*/
import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqAutoLogin
} from '@/api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_TOKEN,
  RECEIVE_USER
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
      if (result.code===0) {
        const user = result.data
        commit(RECEIVE_USER,{user})
      }
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