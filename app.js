//app.js
const {
  request
} = require('./utils/request.js')

App({
  onLaunch: function () {
    // 展示本地存储能力
    let logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openid, sessionKey, unionId
        console.log(res)
        if (res.code) {
          request(`http://127.0.0.1:8080/mini/api/v1/login?code=${res.code}`)
            .then(response => {
              wx.setStorage({
                data: JSON.stringify(response.data),
                key: 'userInfo',
              })
            }).catch(err => {
              console.log('登录失败' + err)
            })
        }
      }
    })
  },
  onThemeChange: function (theme) {
    console.log(theme);
  },
  globalData: {
    userInfo: null,
    theme: 'dark',
    // remote: 'https://wantongcun.com'
    remote: 'http://localhost:8080'
  }
})