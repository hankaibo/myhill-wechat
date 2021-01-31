//app.js
const {
  request
} = require('./utils/request.js')
const base64 = require("./images/base64");

App({
  /**
   * 生命周期回调——监听小程序初始化。
   */
  onLaunch: function () {
    // 展示本地存储能力
    let logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取系统信息
    wx.getSystemInfo({
      success: (res) => {
        const theme = res.theme;
        this.globalData.theme = theme;
      }
    })
    // 调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息，包括用户的唯一标识（openid）及本次登录的会话密钥（session_key）等。
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openid, sessionKey, unionId
        if (res.code) {
          request(`${this.globalData.remote}/mini/api/v1/login?code=${res.code}`)
            .then(response => {
              wx.setStorage({
                data: JSON.stringify(response.data),
                key: 'miniToken',
              })
            }).catch(err => {
              console.log('登录失败' + err)
            })
        }
      }
    })
    // 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。
    wx.getSetting({
      success: res => {
        console.log(res.authSetting);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },

  /**
   * 监听系统主题变化
   * @param {*} theme 
   */
  onThemeChange: function (theme) {
    this.globalData.theme = theme;
  },

  watch: function (method, key) {
    const obj = this.globalData;
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function (value) {
        this[key] = value;
        method(value);
      },
      get: function () {
        return this[key];
      }
    })
  },

  globalData: {
    hasLogin: false,
    // 用户信息(包含敏感信息)
    userInfo: {
      avatarUrl: base64.icon60,
      nickName: '游客'
    },
    useSystem: true,
    // 系统默认主题色
    theme: '',
    // remote: 'https://wantongcun.com'
    remote: 'http://192.168.0.108:8080'
  }
})