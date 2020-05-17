//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      'https://inews.gtimg.com/newsapp_bt/0/2653313955/641',
      'http://desk-fd.zol-img.com.cn/g5/M00/02/05/ChMkJ1bKyZmIWCwZABEwe5zfvyMAALIQABa1z4AETCT730.jpg'
    ],
    show: true,
    showDelete: false,
    idx: 0,
    theme: app.globalData.theme
  },
  change(e) {
    console.log('current index has changed', e.detail);
    this.setData({
      idx: e.detail.current
    })
  },
  handleEnter: function () {
    wx.switchTab({
      url: '../prepaper/index',
    })
  },
  onLoad: function () {},
})