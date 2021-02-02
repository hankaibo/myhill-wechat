// pages/me/index.js
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
    avatarUrl: state.user.avatarUrl,
    nickName: state.user.nickName
  }
})

Page(connect({

  /**
   * 页面的初始数据
   */
  data: {
    dialogLogin: false,
  },

  gotoSetting() {
    wx.navigateTo({
      url: './setting/setting'
    });
  },

  // pc端扫码登录
  handleScan() {
    if (this.data.userInfo) {
      wx.scanCode({
        onlyFromCamera: false,
        scanType: ['qrCode'],
        success: (res) => {
          if (res.errMsg === 'scanCode:ok') {
            console.log(res, '小程序扫码成功。');
            const uuid = res.result;
            const miniTokenStr = wx.getStorageSync('miniToken');
            let miniToken;
            let openid;
            if (miniTokenStr) {
              miniToken = JSON.parse(miniTokenStr);
              openid = miniToken.openid;
            }
            const {
              avatarUrl,
              city,
              country,
              gender,
              language,
              nickName,
              province
            } = this.data.userInfo;
            const user = {
              avatar: avatarUrl,
              city,
              country,
              sex: gender,
              language,
              nickname: nickName,
              province,
              openid,
              uuid
            };
            request(`${remote}/mini/api/v1/token`, 'post', user);
          }
        }
      })
    } else {
      this.setData({
        dialogShow: true
      })
    }
  },

  // 登录
  handleAuth(res) {
    if (res && res.detail && res.detail.userInfo) {
      app.globalData.userInfo = res.detail.userInfo
      this.setData({
        userInfo: res.detail.userInfo,
        dialogLogin: false
      });
    }
  },

  // 关闭登录框
  handleClose() {
    this.setData({
      dialogLogin: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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