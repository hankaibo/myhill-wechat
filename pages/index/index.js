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
    request(`${app.globalData.remote}/api/v1/mini/splash-screen?status=1&current=1&pageSize=10`, 'get')
      .then(({
        data
      }) => {
        const imgUrls = data.list.sort((a, b) => a.sequence - b.sequence).map(item => item.imgUrl);
        this.setData({
          imgUrls
        })
      })
  }

})