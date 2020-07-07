// pages/prepaper/index.js
// 获取应用实例
const app = getApp()
const {
  request
} = require('../../utils/request.js')

Page({
  data: {
    gradeList: [],
    gradeSelected: {},
    courseList: [],
    //
    isShow: false,
    btnValue: [{
      text: '确定'
    }],
    // 主题
    theme: app.globalData.theme
  },
  change(e) {
    this.setData({
      gradeSelected: {
        ...e.detail
      }
    })
    if (this.data.gradeSelected.id) {
      wx.showToast({
        title: `${this.data.gradeSelected.name}`,
        icon: 'success',
        duration: 1000
      })
    }
  },
  close() {
    // 关闭select
    this.selectComponent('#select').close()
  },
  handleSelect(e) {
    const {
      item
    } = e.currentTarget.dataset;
    if (this.data.gradeSelected && this.data.gradeSelected.id) {
      wx.navigateTo({
        url: '../python/index',
        success: res => {
          res.eventChannel.emit("acceptDataFromOpenerPage", {
            grade: {
              name: this.data.gradeSelected.name,
              value: this.data.gradeSelected.id,
            },
            course: item
          })
        }
      });
    } else {
      this.setData({
        isShow: true
      })
    }
  },
  handleDialog(e) {
    this.setData({
      isShow: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    // 非登录用户查询所有年级及课程
    if (app.userInfo == null) {
      request(`${app.globalData.remote}/api/v1/mini/grades?status=1&current=1&pageSize=10`, 'get')
        .then(({
          data
        }) => {
          const list = data.list.map(item => ({
            ...item,
            id: item.id + ''
          })).sort((a, b) => a.sequence - b.sequence);
          that.setData({
            gradeList: list,
          })
        })
      wx.request({
        url: `${app.globalData.remote}/api/v1/mini/courses?status=1&current=1&pageSize=10`,
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