// pages/find/index.js
import {
  mapToData
} from 'minii';
import {
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
    params: {
      pageNum: 1,
      pageSize: 10,
    },
    list: []
  },

  // 获取用户信息之后才让其添加
  handleGetUserInfo(e) {
    const {
      userInfo
    } = e.detail;
    if (userInfo) {
      user.setUserInfo(userInfo);
      this.getData();
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
    this.getData();
  },

  getData() {
    const {
      hasLogin
    } = this.data;
    if (!hasLogin) {
      return
    }
    const {
      params,
      userInfo
    } = this.data;
    const {
      pageNum,
      pageSize
    } = params;
    const {
      openid
    } = userInfo;
    request(`${this.data.remote}/mini/api/v1/circle/${openid}/star?pageNum=${pageNum}&pageSize=${pageSize}`, 'get')
      .then(({
        data
      }) => {
        this.setData({
          list: data.list
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
    const titles = ['关注', '推荐']
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
    this.getData();
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