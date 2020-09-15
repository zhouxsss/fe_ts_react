const isDev = process.env.NODE_ENV === 'development'

export default {
  baseHost: isDev ? process.env.REACT_APP_HOST : window.location.host,
  ccList: '/list'
}