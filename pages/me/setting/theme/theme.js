// pages/me/setting/theme/theme.js
import {
  mapToData
} from 'minii';
import {
  app
} from '../../../../stores/index.js';
const {
  request
} = require('../../../../utils/request.js')

const connect = mapToData(function (state, opt) {
  return {
    useSystem: state.app.useSystem,
    theme: state.app.theme
  }
})

Page(connect({

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
    app.setUseSystem(value);
    // 调用后台接口，更新配置
    // TODO
    // request(`/mini/api/v1/config`, 'put', {
    //   useSystem: value
    // });
    // 不跟随系统后，默认主题
    if (value === false) {
      this.checkedTheme(this.data.theme);
    }
  },

  handleRadio(e) {
    const value = e.detail.value;
    this.checkedTheme(value);
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
      app.setTheme(value);
      // 调用后台接口，更新配置
      // TODO
      // request(`/mini/api/v1/config`, 'put', {
      //   theme: value
      // });
    }
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