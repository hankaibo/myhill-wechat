// pages/welcome/index.js
const {
  request
} = require('../../utils/request.js')

Page({
  data: {
    // 画廊属性
    show: true,
    imgUrls: [],
    current: 0,
  },

  // 画廊事件
  handleChange(e) {
    this.setData({
      idx: e.detail.current
    })
  },

  handleEnter() {
    wx.switchTab({
      url: '../home/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    request('/mini/api/v1/welcome', 'get')
      .then(({
        data
      }) => {
        if (Array.isArray(data) && data.length > 0) {
          const imgUrls = data.sort((a, b) => a.sequence - b.sequence).map(item => item.imgUrl);
          this.setData({
            imgUrls
          })
        } else {
          wx.switchTab({
            url: '../home/index',
          })
        }
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

  }
})