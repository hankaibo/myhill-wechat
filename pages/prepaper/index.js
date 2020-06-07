// pages/prepaper/index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    gradeList: [],
    selected: {},
    list: [{
        id: 1,
        name: '语文'
      },
      {
        id: 2,
        name: '数学'
      },
      {
        id: 3,
        name: '英语'
      },
      {
        id: 4,
        name: '音乐'
      },
      {
        id: 5,
        name: '美术'
      },
    ]
  },
  change(e) {
    this.setData({
      selected: {
        ...e.detail
      }
    })
    wx.showToast({
      title: `${this.data.selected.id} - ${this.data.selected.name}`,
      icon: 'success',
      duration: 1000
    })
  },
  close() {
    // 关闭select
    this.selectComponent('#select').close()
  },
  handleSelect(e) {
    const item = e.currentTarget.dataset;
    console.log(item);
    wx.navigateTo({
      url: '../paper/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.request({
      url: `${app.globalData.remote}/api/v1/mini/grades?current=1&pageSize=10`,
      success: function ({
        data
      }) {
        const list = data.list.map(item => ({
          ...item,
          id: item.id + ''
        })).sort((a, b) => a.sequence - b.sequence);
        that.setData({
          gradeList: list
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