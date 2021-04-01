// pages/circle/detail/detail.js
import {
  mapToData
} from 'minii';
const {
  request
} = require('../../../utils/request.js');

const connect = mapToData(function (state, opt) {
  return {
    theme: state.app.theme,
    hasLogin: state.user.hasLogin,
    userInfo: state.user.userInfo
  }
})

Page(connect({

  /**
   * 页面的初始数据
   */
  data: {

  },


  getData(id) {
    request(`/mini/api/v1/circle/${id}`, 'get')
      .then(({
        data
      }) => {
        this.setData({
          ...data
        });
      })
      .catch(e => {
        console.log(e)
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      const {
        id,
      } = data;
      if (id) {
        this.getData(id);
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
}))