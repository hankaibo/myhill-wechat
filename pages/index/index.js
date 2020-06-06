//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 画廊属性
    show: true,
    imgUrls: [],
    current: 0,
    // 主题
    theme: app.globalData.theme
  },
  // 画廊事件
  handleChange(e) {
    console.log('current index has changed', e.detail);
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
    const that = this;
    wx.request({
      url: `${app.globalData.remote}/api/v1/mini/splash-screen?current=1&pageSize=10`,
      success: function ({
        data
      }) {
        const imgUrls = data.list.sort((a, b) => a.sequence - b.sequence).map(item => item.imgUrl);
        that.setData({
          imgUrls
        })
      }
    })
  },
})