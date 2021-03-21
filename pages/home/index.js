// pages/home/index.js
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
    // 全部
    allList: [],
    allParams: {
      pageNum: 1,
      pageSize: 10
    },
    // 学习
    studyList: [],
    studyParams: {
      pageNum: 1,
      pageSize: 10
    },
    // 活动
    playList: [],
    playParams: {
      pageNum: 1,
      pageSize: 10
    },
    // 绘画
    painingList: [],
    painingParams: {
      pageNum: 1,
      pageSize: 10
    },
    // 图书
    bookList: [],
    bookParams: {
      pageNum: 1,
      pageSize: 10
    },
    // 知识
    knowList: [],
    knowParams: {
      pageNum: 1,
      pageSize: 10
    },
  },

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

  onTabCLick(e) {
    const {
      index
    } = e.detail;
    this.setData({
      activeTab: index
    })
    this.getData(index);
  },

  onChange(e) {
    const {
      index
    } = e.detail;
    this.setData({
      activeTab: index
    })
    this.getData(index);
  },

  getData(index) {
    const {
      allList,
      studyList,
      playList,
      painingList,
      bookList,
      knowList
    } = this.data;
    switch (index) {
      case 0:
        if (allList.length === 0) {
          this.getAllData();
        }
        break;
      case 1:
        if (studyList.length === 0) {
          this.getStudyData();
        }
        break;
      case 2:
        if (playList.length === 0) {
          this.getPlayData();
        }
        break;
      case 3:
        if (painingList.length === 0) {
          this.getPainingData();
        }
        break;
      case 4:
        if (bookList.length === 0) {
          this.getBookData();
        }
        break;
      case 5:
        if (knowList.length === 0) {
          this.getKnowData();
        }
        break;
      default:
        this.getAllData();
    }
  },

  // 查询全部
  getAllData() {
    const {
      pageNum,
      pageSize,
    } = this.data.allParams;
    request(`${this.data.remote}/mini/api/v1/circle?pageNum=${pageNum}&pageSize=${pageSize}`, 'get')
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
  // 查询学习圈
  getStudyData() {
    const {
      pageNum,
      pageSize,
    } = this.data.studyParams;
    request(`${this.data.remote}/mini/api/v1/circle?pageNum=${pageNum}&pageSize=${pageSize}&type=STUDY`, 'get')
      .then(({
        data
      }) => {
        this.setData({
          studyList: data.list
        });
      })
      .catch(e => {
        console.log(e)
      })
  },
  // 查询活动圈
  getPlayData() {
    const {
      pageNum,
      pageSize,
    } = this.data.playParams;
    request(`${this.data.remote}/mini/api/v1/circle?pageNum=${pageNum}&pageSize=${pageSize}&type=PLAY`, 'get')
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
  // 查询绘画圈
  getPainingData() {
    const {
      pageNum,
      pageSize,
    } = this.data.painingParams;
    request(`${this.data.remote}/mini/api/v1/circle?pageNum=${pageNum}&pageSize=${pageSize}&type=PAINING`, 'get')
      .then(({
        data
      }) => {
        this.setData({
          painingList: data.list
        });
      })
      .catch(e => {
        console.log(e)
      })
  },
  // 查询图书圈
  getBookData() {
    const {
      pageNum,
      pageSize,
    } = this.data.bookParams;
    request(`${this.data.remote}/mini/api/v1/circle?pageNum=${pageNum}&pageSize=${pageSize}&type=BOOK`, 'get')
      .then(({
        data
      }) => {
        this.setData({
          bookList: data.list
        });
      })
      .catch(e => {
        console.log(e)
      })
  },
  // 查询知识圈
  getKnowData() {
    const {
      pageNum,
      pageSize,
    } = this.data.knowParams;
    request(`${this.data.remote}/mini/api/v1/circle?pageNum=${pageNum}&pageSize=${pageSize}&type=KNOW`, 'get')
      .then(({
        data
      }) => {
        this.setData({
          knowList: data.list
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
    const titles = ['全部', '学习圈', '活动圈', '绘画圈', '图书圈', '知识圈']
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