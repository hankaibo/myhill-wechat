// pages/me/index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialogShow: false,
    theme: 'light',
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
          console.log(res, '小程序扫码成功。');
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