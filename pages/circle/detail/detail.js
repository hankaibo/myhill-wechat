// pages/circle/detail/detail.js
const {
  request
} = require('../../../utils/request.js');

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  getData(id) {
    const typeList = [{
        name: '学习圈',
        value: 'STUDY',
      },
      {
        name: '活动圈',
        value: 'PLAY',
      },
      {
        name: '绘画圈',
        value: 'PAINING',
      },
      {
        name: '图书圈',
        value: 'BOOK',
      },
      {
        name: '知识圈',
        value: 'KNOW',
      }
    ];
    request(`/mini/api/v1/circles/${id}`, 'get')
      .then(({
        data
      }) => {
        let type = typeList.filter(item => item.value === data.type)[0].name;
        let isOpen = data.isOpen ? '是' : '否';
        this.setData({
          ...data,
          type,
          isOpen
        });
      })
      .catch(e => {
        console.log(e)
      })
  },

  handleBack() {
    wx.navigateBack({
      delta: 1
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
})