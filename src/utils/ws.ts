interface WSOptions {
  url: string
  isOpenDebug?: boolean
  isNeedHeartbeat?: boolean
  pingMsg?: string
  pingTimeout?: number
  pongTimeout?: number
  onOpen?: Function
  onMessage?: Function
}

class WS {
  options: WSOptions
  socket: WebSocket | null
  isConnected: boolean
  isReconnect: boolean
  onOpen: Function | undefined
  onMessage: Function | undefined
  onError: Function | undefined
  onClose: Function | undefined
  pingTimeoutId: number | undefined
  pongTimeoutId: number | undefined
  static openState: 1
  constructor(config: WSOptions) {
    this.options = config
    this.socket = null
    this.isConnected = false
    this.isReconnect = false
    this.initEvent()
    this.initWs()
  }
  private initEvent() {
    //自定义Ws连接函数：服务器连接成功
    this.onOpen = (e: any) => {
      this.isConnected = true
      if (this.options.isOpenDebug) console.log('服务连接成功')
      if (this.options.isNeedHeartbeat) this.heartCheck()

      const openCallback = this.options.onOpen
      if (openCallback && openCallback instanceof Function) {
        openCallback()
      }
    }
    //自定义Ws消息接收函数：服务器向前端推送消息时触发
    this.onMessage = (e: any) => {
      if (this.options.isOpenDebug) console.log('message:', e)
      const messageCallback = this.options.onMessage
      if (messageCallback && messageCallback instanceof Function) {
        messageCallback(e.data)
      }
    }
    //自定义Ws异常事件：Ws报错后触发
    this.onError = (e: any) => {
      if (this.options.isOpenDebug) console.log('error:', e)
      if (this.isConnected) this.reConnect()
    }
    //自定义Ws关闭事件：Ws连接关闭后触发
    this.onClose = (e: any) => {
      if (this.options.isOpenDebug) console.log('close')
      // this.isConnected = false
    }
  }
  private initWs() {
    window.WebSocket = window.WebSocket || WebSocket
    if (!window.WebSocket) {
      // 检测浏览器支持
      console.error('错误: 浏览器不支持websocket')
      return
    }
    const that = this
    this.socket = new window.WebSocket(this.options.url)

    this.socket.onopen = function (e) {
      that.onOpen && that.onOpen(e)
    }
    this.socket.onmessage = function (e) {
      that.onMessage && that.onMessage(e)
    }
    this.socket.onclose = function (e) {
      that.onClose && that.onClose(e)
      that.socket = null // 清理
    }
    this.socket.onerror = function (e) {
      that.onError && that.onError(e)
    }

    return this
  }
  reConnect() {
    if (this.isReconnect) return
    const that = this
    this.isReconnect = true
    //延迟重连
    setTimeout(function () {
      that.initWs()
      that.isReconnect = false
    }, 20000)
  }

  close() {
    this.heartReset()
    this.socket?.close()
  }

  send(msg: any) {
    if (this.socket?.readyState === 1) {
      this.socket?.send(msg)
    }
  }

  heartCheck() {
    this.heartReset()
    this.heartStart()
  }
  //心跳重连
  heartStart() {
    this.pingTimeoutId = setTimeout(() => {
      this.socket?.send(this.options.pingMsg || 'ping')
      this.pongTimeoutId = setTimeout(() => {
        this.socket?.close()
        this.reConnect()
      }, this.options.pongTimeout)
    }, this.options.pingTimeout)
  }
  heartReset() {
    clearTimeout(this.pingTimeoutId)
    clearTimeout(this.pongTimeoutId)
  }
}

export default WS
