// pages/circle/index.js
const {
  request
} = require('../../utils/request.js')

const app = getApp();

Page({
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
    listParam: [{
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
    approvalStatus: {
      UNDER_REVIEW: '审核中',
      SUCCESS: '通过',
      REJECTED: '被拒绝',
      WITHDRAWN: '已撤回'
    }
  },

  // 获取用户信息之后才让其添加
  handleGetUserInfo(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        app.store.setState({
          user: res.userInfo
        });
        app.onUserUpdate(res.userInfo);
        this.getData();
      }
    })
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
    } = app.store.getState();

    request(`/mini/api/v1/circles/${id}`, 'delete')
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
    const {
      index
    } = e.detail;
    this.setData({
      activeTab: index
    })
    let type = this.getTypeByIndex(index);
    this.getData('up', index, type);
  },

  // 获取数据
  getData(direction = 'up', index = 0, type = '') {
    const {
      openid,
      user: {
        nickName
      }
    } = app.store.getState();
    const {
      listData,
      listParam,
    } = this.data;
    // 未登录、未授权
    if (!openid || !nickName) {
      return
    }
    const {
      pageNum,
      pageSize,
    } = listParam[index];
    // 向下，页数加1
    if (direction === 'down') {
      request(`/mini/api/v1/circles?pageNum=${pageNum + 1}&pageSize=${pageSize}&openid=${openid}`, 'get')
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
      request(`/mini/api/v1/circles?pageNum=${1}&pageSize=${pageSize}&openid=${openid}`, 'get')
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

    setTimeout(() => {
      this.setTableHeight();
    }, 500)
  },

  // 设置高度
  setTableHeight() {
    const {
      activeTab
    } = this.data;
    wx.createSelectorQuery().in(this).select(`#tabsSwiper-${activeTab}`).boundingClientRect(rect => {
      this.setData({
        tabHeiaght: Math.max(rect.height,300),
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData();
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
})