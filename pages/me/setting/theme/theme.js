// pages/me/setting/theme/theme.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioThemes: [{
        name: '普通模式',
        value: 'light'
      },
      {
        name: '深色模式',
        value: 'dark'
      }
    ],
  },

  handleSwitch(e) {
    const value = e.detail.value;
    app.store.setState({
      useSystem: value
    });
    // 跟随系统
    if (value) {
      wx.getSystemInfo({
        success: (res) => {
          const theme = res.theme;
          app.store.setState({
            theme
          });
        }
      });
    } else {
      const {
        theme
      } = app.store.getState();
      this.checkedTheme(theme);
    }
  },

  handleRadio(e) {
    const value = e.detail.value;
    this.checkedTheme(value);
    app.store.setState({
      theme: value
    })
  },

  checkedTheme(value) {
    if (value === 'dark' || value === 'light') {
      const radioThemes = this.data.radioThemes;
      for (let i = 0, len = radioThemes.length; i < len; ++i) {
        radioThemes[i].checked = radioThemes[i].value == value;
      }

      this.setData({
        radioThemes: radioThemes
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      theme
    } = app.store.getState();
    this.checkedTheme(theme);
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