//app.js
require('./stores/index');
import {
  app,
  user,
} from './stores/index.js';
const {
  request
} = require('./utils/request.js');

App({
  /**
   * 生命周期回调——监听小程序初始化。
   */
  onLaunch: function () {
    // 获取系统信息
    wx.getSystemInfo({
      success: (res) => {
        const theme = res.theme;
        app.setTheme(theme);
      }
    })
    // 调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息，包括用户的唯一标识（openid）及本次登录的会话密钥（session_key）等。
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openid, sessionKey, unionId
        if (res.code) {
          request(`${app.getRemote()}/mini/api/v1/login?code=${res.code}`)
            .then(response => {
              const {
                token,
                openid
              } = response.data;
              // 存储用户 openid
              user.setUserInfo({
                openid
              });
              try {
                wx.setStorageSync('miniToken', token)
              } catch (error) {
                console.log('同步保存token失败，原因：', error);
              }
            }).catch(err => {
              console.log('登录失败，原因：' + err);
            })
        }
      }
    })
    // 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              user.setUserInfo(res.userInfo);

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
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
    app.setTheme(theme);
  },

})