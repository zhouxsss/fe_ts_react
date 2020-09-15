import Axios from 'axios'
import { message as Message } from 'antd'
import paths from '@/constants/paths'

const isDev = process.env.NODE_ENV === 'development'

const axios = Axios.create({
  baseURL: 'http://' + paths.baseHost,
  timeout: 30000,
})

//添加请求拦截器
axios.interceptors.request.use(
  (request) => {
    return request
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

//添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    const data = response.data
    if (!data || !data.code) {
      return response
    }
    const { code, message } = data
    if (code === 200) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(data)
    }
  },
  (error) => {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 400:
          Message.error(JSON.stringify(error.response.data))
          break
        case 500:
          break
        default:
          Message.error(`
          网络错误${isDev ? ',' + error.response.data.message : ''}`)
      }
      return Promise.reject(error.response)
    }
    return Promise.reject(error)
  }
)

export default axios
