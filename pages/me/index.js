// pages/me/index.js
const {
  request
} = require('../../utils/request.js')
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialogShow: false,
    theme: 'dark',
    userInfo: {},
  },

  handleAuth(res) {
    if (res && res.detail && res.detail.userInfo) {
      this.setData({
        userInfo: res.detail.userInfo
      });
      app.globalData.userInfo = res.detail.userInfo
      this.setData({
        dialogShow: false
      })
    }
  },

  handleClose() {
    this.setData({
      dialogShow: false
    })
  },

  handleScan() {
    if (this.data.userInfo) {
      wx.scanCode({
        onlyFromCamera: false,
        scanType: ['qrCode'],
        success: (res) => {
          if (res.errMsg === 'scanCode:ok') {
            console.log(res, '小程序扫码成功。');
            const uuid = res.result;
            const miniTokenStr = wx.getStorageSync('miniToken');
            let miniToken;
            let openid;
            if (miniTokenStr) {
              miniToken = JSON.parse(miniTokenStr);
              openid = miniToken.openid;
            }
            const {
              avatarUrl,
              city,
              country,
              gender,
              language,
              nickName,
              province
            } = this.data.userInfo;
            const user = {
              avatar: avatarUrl,
              city,
              country,
              sex: gender,
              language,
              nickname: nickName,
              province,
              openid,
              uuid
            };
            request(`${app.globalData.remote}/mini/api/v1/token`, 'post', user);
          }
        }
      })
    } else {
      this.setData({
        dialogShow: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //调用应用实例的方法获取全局数据
    this.setData({
      userInfo: app.globalData.userInfo
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  themeChanged: function (theme) {
    this.setData({
      theme
    })
  }
})