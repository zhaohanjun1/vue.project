/*
对axio进行2次封装一个能发axio请求的函数
*/
import axios from 'axios'
import qs from 'qs'
import { Indicator , Toast , MessageBox}  from 'mint-ui'
import store from '@/vuex/store'
import router from '@/router'

const instance = axios.create({
  // baseURL: 'http://localhost:4 000',//出跨域请求问题
  baseURL: '/api',//让代理服务器转发请求4000
  timeout: 20000 //4.配置请求超时的时间
})

//添加请求拦截器
instance.interceptors.request.use((config)=>{
  Indicator.open()
  //3.对请求体参数进行urlencode处理，而不使用默认的json方式(后台接口不支持)
  const data = config.data 
  if (data instanceof Object) {
    config.data = qs.stringify(data)
  }

  //5.通过请求头携带token数据
  const token = store.state.token
  if (token){
    config.headers['Authorization'] = token 
  }

  return config
})

//响应拦截器

instance.interceptors.response.use(
  response =>{
    Indicator.close()
    // return response
    //2.异步请求成功的数据不是response，而是response.data
    return response.data
  },
  error => {
    Indicator.close()

    //如果响应状态码是401，自动跳转到login页面
    if (error.response.status===401) {
      router.replace('./login')
      Toast('登陆失效，请重新登陆')
    }else{
      //1.统一处理请求异常
      MessageBox('提示','请求出错：' +error.message)
    }
    // return Promise.request(error)
    
    return new Promise(()=> {})//返回一个pending状态的promise=>中断promise链
  }
)

export default instance
