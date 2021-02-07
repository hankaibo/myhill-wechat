// pages/circle/index.js
import {
  mapToData
} from 'minii';
import {
  app,
  user
} from '../../stores/index.js';
const {
  request
} = require('../../utils/request.js')

const connect = mapToData(function (state, opt) {
  return {
    remote: state.app.remote,
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
    tabs: [],
    activeTab: 0,
    // 全部参数及数据
    allParams: {
      current: 1,
      pageSize: 20
    },
    allList: [],
    // 活动圈参数及数据
    playParams: {
      current: 1,
      pageSize: 10,
      name: ''
    },
    playList: []
  },

  // 获取用户信息之后才让其添加
  handleGetUserInfo(e) {
    const {
      userInfo
    } = e.detail;
    if (userInfo) {
      user.setUserInfo(userInfo);
      this.handleAdd();
    }
  },

  onTabCLick(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
    this.getPlayData();
  },

  // 查询全部
  getAllData() {
    const {
      current,
      pageSize
    } = this.data.allParams;
    request(`${this.data.remote}/mini/api/v1/circle/play?current=${current}&pageSize=${pageSize}`, 'get')
      .then(({
        data
      }) => {
        this.setData({
          allList: data.list
        });
      })
      .catch(e => {
        console.log(e)
      })
  },

  // 查询活动圈
  getPlayData() {
    const {
      current,
      pageSize,
      name
    } = this.data.playParams;
    request(`${this.data.remote}/mini/api/v1/circle/play?current=${current}&pageSize=${pageSize}&name=${name}`, 'get')
      .then(({
        data
      }) => {
        this.setData({
          playList: data.list
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
    const titles = ['全部', '学习圈', '活动圈', '绘本圈', '热门圈', '知识圈']
    const tabs = titles.map(item => ({
      title: item
    }))
    //调用应用实例的方法获取全局数据
    this.setData({
      tabs,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getAllData();
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

  },
}))