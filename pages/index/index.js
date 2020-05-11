//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    welcomeUrl: 'https://inews.gtimg.com/newsapp_bt/0/2653313955/641'
  },
  onLoad: function () {
    setTimeout(function () {
      wx.switchTab({
        url: '../demo/index',
      })
    }, 2000)
  },
})