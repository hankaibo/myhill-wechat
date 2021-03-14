// pages/circle/add/add.js
import {
  mapToData
} from 'minii';
const {
  request
} = require('../../../utils/request.js')
const {
  formatDate,
  formatTime
} = require('../../../utils/util')

const datetime = new Date();
datetime.setDate(datetime.getDate() + 1);

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
    files: [],
    radioItems: [{
        name: '学习',
        value: '1',
        disabled: true,
        checked: true
      },
      {
        name: '绘画',
        value: '2',
        disabled: true,
        checked: false
      },
      {
        name: '活动',
        value: '3',
        disabled: true,
        checked: true
      }
    ],
    type: '3',
    name: '',
    date: formatDate(datetime),
    time: '10:00',
    place: '',
    isOpen: true,
    description: '',
    formData: {
      type: '3',
      date: formatDate(datetime),
      time: '10:00',
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
    ]
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems,
      [`formData.radio`]: e.detail.value
    });
  },
  bindDatetimeChange: function (e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [field]: e.detail.value,
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
      isOpen: e.detail.value,
      [`formData.isOpen`]: e.detail.value
    })
  },
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
  uplaodFile(files) {
    let that = this;
    console.log('upload files', files);
    const tempFilePaths = files.tempFilePaths[0];
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: `${this.data.remote}/mini/api/v1/circle/play/upload`,
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
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
  },
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        const {
          formData,
          userInfo
        } = this.data;
        const {
          date,
          time,
        } = formData;
        const {
          openid
        } = userInfo;
        console.log('values,', formData);
        request(`${this.data.remote}/mini/api/v1/circle/${openid}/play`, 'post', {
            ...formData,
            startTime: `${date} ${time}:00`
          })
          .then(({
            data
          }) => {
            wx.showToast({
              title: '成功',
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
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
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