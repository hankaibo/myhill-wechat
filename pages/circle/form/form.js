// pages/circle/form/form.js
const {
  request
} = require('../../../utils/request.js');
const {
  formatDate,
} = require('../../../utils/util');
const chooseLocation = requirePlugin('chooseLocation');

const datetime = new Date();
datetime.setDate(datetime.getDate() + 1);

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    typeList: [{
      name: '学习圈',
      value: 'STUDY',
    },
    {
      name: '活动圈',
      value: 'PLAY',
    },
    {
      name: '绘画圈',
      value: 'PAINING',
    },
    {
      name: '图书圈',
      value: 'BOOK',
    },
    {
      name: '知识圈',
      value: 'KNOW',
    }
    ],
    formData: {
      type: 0,
      status: 'ENABLED',
      date: formatDate(datetime),
      time: '10:00',
      place: '北京',
      isOpen: true,
      description: ''
    },
    rules: [{
      name: 'type',
      rules: {
        required: true,
        message: '类型是必填项'
      }
    },
    {
      name: 'name',
      rules: {
        required: true,
        message: '名称是必填项'
      }
    },
    {
      name: 'date',
      rules: {
        required: true,
        message: '日期是必填项'
      }
    },
    {
      name: 'time',
      rules: {
        required: true,
        message: '时间是必填项'
      }
    },
    {
      name: 'place',
      rules: {
        required: true,
        message: '地点是必填项'
      }
    },
    {
      name: 'description',
      rules: {
        maxlength: 20
      }
    }
    ],
  },
  formPickerChange: function (e) {
    const {
      field
    } = e.currentTarget.dataset;
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  formSwitchChange(e) {
    this.setData({
      [`formData.isOpen`]: e.detail.value
    })
  },
  //地图插件
  handleMap() {
    const key = '2EWBZ-VXJ6X-YS44S-TJV5E-LO4TT-EZFIR'; //使用在腾讯位置服务申请的key
    const referer = 'mini_hill'; //调用插件的app的名称

    wx.navigateTo({
      url: `plugin://chooseLocation/index?key=${key}&referer=${referer}`
    });
  },
  // 上传图片
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  selectFile(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
  },
  uploadFile(files) {
    const {
      openid
    } = app.store.getState();
    let that = this;
    console.log('upload files', files);
    const tempFilePaths = files.tempFilePaths[0];
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: `/mini/api/v1/circle/${openid}/upload`,
        filePath: tempFilePaths,
        name: 'file',
        success(res) {
          if (res.statusCode === 200) {
            that.setData({
              [`formData.imgUrl`]: res.data
            })
            resolve({
              urls: [res.data]
            })
          }
        },
        fail() {
          reject('error');
        }
      })
    })
  },
  uploadError(e) {
    wx.showToast({
      title: '上传图片失败',
      icon: 'error'
    })
  },
  uploadSuccess(e) {
    wx.showToast({
      title: '上传图片成功'
    })
  },
  // 提交
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        const {
          openid
        } = app.store.getState();
        const {
          typeList,
          formData
        } = this.data;
        const {
          id,
          type,
          date,
          time,
        } = formData;
        // 编辑
        if (id) {
          request(`/mini/api/v1/circles/${id}`, 'put', {
            ...formData,
            openid,
            startTime: `${date} ${time.substr(0, 5)}:00`,
            type: typeList[type].value
          })
            .then(() => {
              wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 2000
              })
              wx.navigateBack({
                delta: 1
              })
            })
            .catch(e => {
              console.log(e)
            })
        } else {
          request(`/mini/api/v1/circles`, 'post', {
            ...formData,
            openid,
            startTime: `${date} ${time}:00`,
            type: typeList[type].value
          })
            .then(() => {
              wx.showToast({
                title: '添加成功',
                icon: 'success',
                duration: 2000
              })
              wx.navigateBack({
                delta: 1
              })
            })
            .catch(e => {
              console.log(e)
            })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selectFile: this.selectFile.bind(this),
      uploadFile: this.uploadFile.bind(this)
    })
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      const {
        edit,
        circle
      } = data;
      if (edit) {
        wx.setNavigationBarTitle({
          title: '编辑圈子',
        })
      }
      if (circle) {
        const {
          id,
          type,
          name,
          startTime,
          place,
          isOpen,
          description,
        } = circle;
        const datetimeArr = startTime.split(' ');
        let date = null;
        let time = null;
        if (datetimeArr.length === 2) {
          date = datetimeArr[0];
          time = datetimeArr[1];
        }
        let selectedTypeIndex = 0;
        for (let i = 0; i < this.data.typeList.length; i += 1) {
          if (this.data.typeList[i].value = type) {
            selectedTypeIndex = i;
          }
        }
        this.setData({
          formData: {
            id,
            type: selectedTypeIndex,
            name,
            date,
            time,
            place,
            isOpen,
            description,
          }
        })
      }
    })
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
    // 从地图选点插件返回后，在页面的onShow生命周期函数中能够调用插件接口，取得选点结果对象
    const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    if(location) {
      this.setData({
        [`formData.place`]: location.name
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
    // 页面卸载时设置插件选点数据为null，防止再次进入页面，geLocation返回的是上次选点结果
    chooseLocation.setLocation(null);
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