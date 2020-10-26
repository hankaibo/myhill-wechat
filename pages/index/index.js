// pages/index/index.js
// 获取应用实例
const app = getApp()
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
      url: '../prepaper/index',
    })
  },
  // 页面生命周期函数
  onLoad() {
    request(`${app.globalData.remote}/mini/api/v1/splash-screen`, 'get')
      .then(({
        data
      }) => {
        const imgUrls = data.sort((a, b) => a.sequence - b.sequence).map(item => item.imgUrl);
        this.setData({
          imgUrls
        })
      })
  }

})