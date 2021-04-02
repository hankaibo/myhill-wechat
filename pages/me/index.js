// pages/me/index.js
const {
  request
} = require('../../utils/request.js')

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
  },

  gotoSetting() {
    wx.navigateTo({
      url: './setting/setting'
    });
  },

  // pc端扫码登录
  handleScan() {
    const {
      user: {
        avatarUrl,
        city,
        country,
        gender,
        language,
        nickName,
        province
      }
    } = app.store.getState();
    // 通过昵称判断是否授权
    if (nickName) {
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
            request(`/mini/api/v1/token`, 'post', user);
          }
        }
      })
    } else {
      this.setData({
        show: true
      })
    }
  },

  // 用户授权
  handleAuth(res) {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        app.store.setState({
          user: res.userInfo
        });
        app.onUserUpdate(res.userInfo);
        this.setData({
          show: false
        });
      }
    })
  },

  // 关闭授权框
  handleClose() {
    this.setData({
      show: false
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
    const {
      user
    } = app.store.getState();
    // 用户未受权
    if (!user.nickName) {
      this.setData({
        show: true
      })
    } else {
      this.setData({
        show: false
      })
    }
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