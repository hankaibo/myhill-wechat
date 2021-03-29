// pages/home/index.js
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

  handleSwitch(index, direction) {
    switch (Number.parseInt(index, 10)) {
      case 0:
        this.getAllData(direction);
        break;
      case 1:
        this.getStudyData(direction);
        break;
      case 2:
        this.getPlayData(direction);
        break;
      case 3:
        this.getPainingData(direction);
        break;
      case 4:
        this.getBookData(direction);
        break;
      case 5:
        this.getKnowData(direction);
        break;
      default:
        this.getAllData(direction);
    }
  },
  upper(e) {
    const {
      index
    } = e.target;
    this.handleSwitch(index, 'up');
  },
  lower(e) {
    const {
      index
    } = e.target;
    this.handleSwitch(index, 'down');
  },

  // 查询全部
  getAllData(direction = 'up') {
    const {
      pageNum,
      pageSize,
    } = this.data.allParams;
    const {
      allList
    } = this.data;
    // 向下，页数加1
    if (direction === 'down') {
      request(`${this.data.remote}/mini/api/v1/circle?pageNum=${pageNum+1}&pageSize=${pageSize}`, 'get')
        .then(({
          data
        }) => {
          this.setData({
            allList: allList.concat(data.list),
            allParams: {
              pageNum: pageNum + 1,
              pageSize,
            }
          });
        })
        .catch(e => {
          console.log('下滑事件获取全部圈子数据失败，失败原因：', e);
        })
    } else if (direction === 'up') {
      request(`${this.data.remote}/mini/api/v1/circle?pageNum=${1}&pageSize=${pageSize}`, 'get')
        .then(({
          data
        }) => {
          this.setData({
            allList: data.list,
            allParams: {
              pageNum: 1,
              pageSize,
            }
          });
        })
        .catch(e => {
          console.log('上拉事件获取全部圈子数据失败，失败原因：', e);
        })
    }
  },
  // 查询学习圈
  getStudyData(direction = 'up') {
    const {
      pageNum,
      pageSize,
    } = this.data.studyParams;
    const {
      studyList
    } = this.data;
    if (direction === 'down') {
      request(`${this.data.remote}/mini/api/v1/circle?pageNum=${pageNum+1}&pageSize=${pageSize}&type=STUDY`, 'get')
        .then(({
          data
        }) => {
          this.setData({
            studyList: studyList.concat(data.list),
            studyParams: {
              pageNum: pageNum + 1,
              pageSize
            }
          });
        })
        .catch(e => {
          console.log(e)
        })
    } else if (direction === 'up') {
      request(`${this.data.remote}/mini/api/v1/circle?pageNum=${1}&pageSize=${pageSize}&type=STUDY`, 'get')
        .then(({
          data
        }) => {
          this.setData({
            studyList: data.list,
            studyParams: {
              pageNum: 1,
              pageSize
            }
          });
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  // 查询活动圈
  getPlayData(direction = 'up') {
    const {
      pageNum,
      pageSize,
    } = this.data.playParams;
    const {
      playList
    } = this.data;
    if (direction === 'down') {
      request(`${this.data.remote}/mini/api/v1/circle?pageNum=${pageNum+1}&pageSize=${pageSize}&type=PLAY`, 'get')
        .then(({
          data
        }) => {
          this.setData({
            playList: playList.concat(data.list),
            playParams: {
              pageNum: pageNum + 1,
              pageSize
            }
          });
        })
        .catch(e => {
          console.log(e)
        })
    } else if (direction === 'up') {
      request(`${this.data.remote}/mini/api/v1/circle?pageNum=${1}&pageSize=${pageSize}&type=PLAY`, 'get')
        .then(({
          data
        }) => {
          this.setData({
            playList: data.list,
            playParams: {
              pageNum: 1,
              pageSize
            }
          });
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  // 查询绘画圈
  getPainingData(direction = 'up') {
    const {
      pageNum,
      pageSize,
    } = this.data.painingParams;
    const {
      painingList
    } = this.data;
    if (direction === 'down') {
      request(`${this.data.remote}/mini/api/v1/circle?pageNum=${pageNum+1}&pageSize=${pageSize}&type=PAINING`, 'get')
        .then(({
          data
        }) => {
          this.setData({
            painingList: painingList.concat(data.list),
            painingParams: {
              pageNum: pageNum + 1,
              pageSize
            }
          });
        })
        .catch(e => {
          console.log(e)
        })
    } else if (direction === 'up') {
      request(`${this.data.remote}/mini/api/v1/circle?pageNum=${1}&pageSize=${pageSize}&type=PAINING`, 'get')
        .then(({
          data
        }) => {
          this.setData({
            painingList: data.list,
            painingParams: {
              pageNum: 1,
              pageSize
            }
          });
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  // 查询图书圈
  getBookData(direction = 'up') {
    const {
      pageNum,
      pageSize,
    } = this.data.bookParams;
    const {
      bookList
    } = this.data;
    if (direction === 'down') {
      request(`${this.data.remote}/mini/api/v1/circle?pageNum=${pageNum+1}&pageSize=${pageSize}&type=BOOK`, 'get')
        .then(({
          data
        }) => {
          this.setData({
            bookList: bookList.concat(data.list),
            bookParams: {
              pageNum: pageNum + 1,
              pageSize
            }
          });
        })
        .catch(e => {
          console.log(e)
        })
    } else if (direction === 'up') {
      request(`${this.data.remote}/mini/api/v1/circle?pageNum=${1}&pageSize=${pageSize}&type=BOOK`, 'get')
        .then(({
          data
        }) => {
          this.setData({
            bookList: data.list,
            bookParams: {
              pageNum: 1,
              pageSize
            }
          });
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  // 查询知识圈
  getKnowData(direction = 'up') {
    const {
      pageNum,
      pageSize,
    } = this.data.knowParams;
    const {
      knowList
    } = this.data;
    if (direction === 'down') {
      request(`${this.data.remote}/mini/api/v1/circle?pageNum=${pageNum+1}&pageSize=${pageSize}&type=KNOW`, 'get')
        .then(({
          data
        }) => {
          this.setData({
            knowList: knowList.concat(data.list),
            knowParams: {
              pageNum: pageNum + 1,
              pageSize
            }
          });
        })
        .catch(e => {
          console.log(e)
        })
    } else if (direction === 'up') {
      request(`${this.data.remote}/mini/api/v1/circle?pageNum=${1}&pageSize=${pageSize}&type=KNOW`, 'get')
        .then(({
          data
        }) => {
          this.setData({
            knowList: data.list,
            knowParams: {
              pageNum: 1,
              pageSize
            }
          });
        })
        .catch(e => {
          console.log(e)
        })
    }
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