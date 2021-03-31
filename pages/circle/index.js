// pages/circle/index.js
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

const appInstance = getApp();

Page(connect({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [],
    activeTab: 0,
    listData: [
      [],
      [],
    ],
    listParam: [
      {
        pageNum: 1,
        pageSize: 10
      },
      {
        pageNum: 1,
        pageSize: 10
      },
    ],
    slideButtons: [{
      text: '编辑',
    }, {
      type: 'warn',
      text: '删除',
    }],
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
  handleAdd() {
    wx.navigateTo({
      url: './form/form',
    });
  },
  slideButtonTap(e) {
    const {
      index
    } = e.detail;
    const {
      field: {
        id
      }
    } = e.currentTarget.dataset;
    if (index === 0) {
      this.handleEdit(e);
    }
    if (index === 1) {
      this.handleDel(id);
    }
  },
  // 编辑
  handleEdit(e) {
    const {
      field
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: './form/form',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          edit: true,
          circle: field
        })
      }
    })
  },
  // 删除
  handleDel(id) {
    const {
      openid
    } = this.data.userInfo;
    request(`${this.data.remote}/mini/api/v1/circle/${openid}/${id}`, 'delete')
      .then(() => {
        this.getData();
      })
      .catch(e => {
        console.log('删除圈子失败，原因：', e);
      })
  },
  // 进入详情
  handleView(e) {
    const {
      field
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: './detail/detail',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          id: field
        })
      }
    })
  },

  onChange(e) {
    const { index } = e.detail;
    this.setData({
      activeTab: index
    })
    let type = this.getTypeByIndex(index);
    this.getData('up', index, type);
  },

  // 获取数据
  getData(direction = 'up', index = 0, type = '') {
    const {
      hasLogin,
      userInfo,
      listData,
      listParam,
    } = this.data;
    if (!hasLogin) {
      return
    }
    const { openid } = userInfo;
    const {
      pageNum,
      pageSize,
    } = listParam[index];
    // 向下，页数加1
    if (direction === 'down') {
      request(`${this.data.remote}/mini/api/v1/circle/${openid}/list?pageNum=${pageNum + 1}&pageSize=${pageSize}`, 'get')
        .then(({
          data
        }) => {
          listData[index].concat(data.list);
          listParam[index] = {
            pageNum: pageNum + 1,
            pageSize,
          };
          this.setData({
            listData,
            listParam,
          });
        })
        .catch(e => {
          console.log(e)
        })
    } else if (direction === 'up') {
      request(`${this.data.remote}/mini/api/v1/circle/${openid}/list?pageNum=${1}&pageSize=${pageSize}`, 'get')
        .then(({
          data
        }) => {
          listData[index] = data.list;
          listParam[index] = {
            pageNum: 1,
            pageSize,
          };
          this.setData({
            listData,
            listParam,
          });
        })
        .catch(e => {
          console.log(e)
        })
    }
  },

  // 设置高度
  setTableHeight() {
    const {
      activeTab
    } = this.data;
    wx.createSelectorQuery().in(this).select(`#tabsSwiper-${activeTab}`).boundingClientRect(rect => {
      this.setData({
        tabHeiaght: rect.height
      })
    }).exec();
  },

  // 根据索引获取类型
  getTypeByIndex(index) {
    let type = '';
    switch (index) {
      case 0:
        type = '';
        break;
      case 1:
        type = 'xxx';
        break;
      default:
        type = '';
    }
    return type;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const titles = ['我创建的', '我参加的'];
    const tabs = titles.map(item => ({
      title: item
    }));
    //调用应用实例的方法获取全局数据
    this.setData({
      tabs,
    });
    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况
    appInstance.userInfoReadyCallback = res => {
      console.log('异步保存用户信息了。')
      user.setUserInfo(res.userInfo);
    }
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
    let index = this.data.activeTab;
    let type = this.getTypeByIndex(index);
    this.getData('up', index, type);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let index = this.data.activeTab;
    let type = this.getTypeByIndex(index);
    this.getData('down', index, type);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
}))