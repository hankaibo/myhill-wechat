//app.js
import store from './store/index.js'
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
        store.setState({
          theme
        });
      }
    })
    // 调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息，包括用户的唯一标识（openid）及本次登录的会话密钥（session_key）等。
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openid, sessionKey, unionId
        if (res.code) {
          request(`/mini/api/v1/login?code=${res.code}`)
            .then(response => {
              const {
                token,
                openid
              } = response.data;
              // 存储用户 openid
              store.setState({
                openid,
              });
              try {
                wx.setStorageSync('miniToken', token)
              } catch (error) {
                console.log('同步保存token失败，原因：', error);
              }
            })
            .then(() => {
              return request('/mini/api/v1/users/info')
            })
            .then(response => {
              const {
                nickname: nickName,
                avatar: avatarUrl,
                sex: gender,
                country,
                province,
                city,
                language
              } = response.data;
              store.setState({
                user: {
                  nickName,
                  avatarUrl,
                  gender,
                  country,
                  province,
                  city,
                  language,
                }
              });
            }).catch(err => {
              console.log('登录失败，原因：' + err);
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
    store.setState({
      theme
    });
  },

  /**
   * 授权之后更新用户
   */
  onUserUpdate: function (userInfo) {
    const {
      avatarUrl: avatar,
      city,
      country,
      gender: sex,
      language,
      nickName: nickname,
      province
    } = userInfo;
    request('/mini/api/v1/users', 'put', {
        avatar,
        city,
        country,
        sex,
        language,
        nickname,
        province,
      })
      .then(() => {
        console.log('用户登录更新成功。')
      }).catch(err => {
        console.log('用户登录更新失败：' + err);
      })
  },

  store: store,
})