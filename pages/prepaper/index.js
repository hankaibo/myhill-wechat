// pages/prepaper/index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    gradeList: [],
    gradeSelected: {},
    courseList: [],
    // 主题
    theme: app.globalData.theme
  },
  change(e) {
    this.setData({
      gradeSelected: {
        ...e.detail
      }
    })
    wx.showToast({
      title: `${this.data.gradeSelected.id} - ${this.data.gradeSelected.name}`,
      icon: 'success',
      duration: 1000
    })
  },
  close() {
    // 关闭select
    this.selectComponent('#select').close()
  },
  handleSelect(e) {
    const {item} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../paper/index?g=${this.data.gradeSelected.id}&c=${item.value}`
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    // 非登录用户查询所有年级及课程
    if (app.userInfo == null) {
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
            gradeList: list,
          })
        }
      })
      wx.request({
        url: `${app.globalData.remote}/api/v1/mini/courses?current=1&pageSize=10`,
        success: function ({
          data
        }) {
          const list = data.list.map(item => ({
            ...item,
            id: item.id + ''
          }));
          that.setData({
            courseList: list
          })
        }
      })
    }

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