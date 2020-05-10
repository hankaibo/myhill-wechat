// pages/demo/demo.js
const questionData = require('../../utils/data.js')
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    storageData: {
      swiper: {},
      answers: {}
    },
    hasUserInfo: false,
    isLoading: false,
    isFirst: true,
    swiper: {
      active: 0
    },
    layerlayer: {
      isLayerShow: false,//默认弹窗
      layerAnimation: {},//弹窗动画
    },
    isLocal: true,
    answers: {
      start: 0,//初始题号
      end: 0,//结束题号
      allList: [],//题号数据
      activeNum: 0,//当前显示条数
      onceLoadLength: 5,//一次向俩端加载条数，因我使用本地数据，此属性未实际使用
      isShowTip: false//默认是否显示提示
    }
  },
  //单选逻辑
  tapRadio: function (e) {
    let thisOption = e.currentTarget.dataset.option
    let list = this.data.answers.allList[thisOption[2]].options.map(function (option, i) {
      if (thisOption[1] == i && option.class != 'active') {
        option.Select = true
      } else {
        option.Select = false
      }
      return option
    })
    this.data.answers.allList[this.data.swiper.active].options = list
    this.tapSelect(e)
  },
  //答案判断逻辑
  tapSelect: function (e) {
    if (!this.data.isFirst || this.data.answers.allList[this.data.answers.start + this.data.swiper.active].isAnswer) {
      return false
    }

    this.data.isFirst = false
    let bool = true
    let correct = this.data.answers.allList[this.data.swiper.active]['a']
    let data = this.data.answers.allList[this.data.swiper.active].options.map((option, i) => {
      if (option.Select && option.label != correct) {
        option.class = 'error'
        bool = false
      }
      if (!option.Select && option.label === correct) {
        option.class = 'active-success'
        bool = false
      }
      if (option.Select && option.label === correct) {
        option.class = 'success'
      }
      return option
    })

    if (bool) {
      this.data.answers.allList[this.data.answers.start + this.data.swiper.active].isAnswer = 1
      this.data.answers.success++
    } else {
      this.data.answers.allList[this.data.answers.start + this.data.swiper.active].isAnswer = 2
      this.data.answers.error++
    }

    this.data.answers.allList[this.data.answers.start + this.data.swiper.active].options = data
    this.data.answers.isShowTip = !bool
    this.setData(this.data)
    //延迟加载滑动
    if (this.data.answers.activeNum + 1 < this.data.answers.allList.length) {
      setTimeout(() => this.onSwiper('left'), 200)
    } else {
      // 结束了
      console.log('已经扯到底了。')
    }
  },
  //页码切换列表效果
  pageClick: function () {
    let layerAnimation = wx.createAnimation({
      transformOrigin: '50% 50%',
      duration: 500,
      timingFunction: 'ease',
      delay: 0
    })
    if (!this.data.layerlayer.isLayerShow) {
      layerAnimation.translate3d(0, 0, 0).step()
    } else {
      layerAnimation.translate3d(0, '100%', 0).step()
    }
    this.data.layerlayer.isLayerShow = !this.data.layerlayer.isLayerShow
    this.data.layerlayer.layerAnimation = layerAnimation
    this.setData(this.data)
  },
  //页码切换列表收缩
  layerFooterClick: function () {
    let layerAnimation = wx.createAnimation({
      transformOrigin: '50% 50%',
      duration: 500,
      timingFunction: 'ease',
      delay: 0
    })
    layerAnimation.translate3d(0, '100%', 0).step()
    this.data.layerlayer.isLayerShow = false
    this.data.layerlayer.layerAnimation = layerAnimation
    this.setData(this.data)
  },
  //收藏逻辑
  collectList: function () {
    let index = this.data.answers.activeNum
    this.data.answers.allList[index].isStore = !this.data.answers.allList[index].isStore
    this.setData(this.data)
  },
  //题号变更逻辑
  setActiveNum: function (e) {
    let thisOption = e.currentTarget.dataset.option - 0
    this.data.answers.activeNum = thisOption
    this.data.isFirst = false
    this.data.isLoading = false
    this.layerFooterClick()
    this.getSubject()
  },
  //swiper切换
  setEvent: function (e) {
    this.data.swiper.touchstartEvent = e
    return false
  },
  //滑动结束
  touchEnd: function (e) {
    this.onSwiper(this.getDirection(this.data.swiper.touchstartEvent, e))
    return false
  },
  //swiper切换
  onSwiper: function (dire) {
    let that = this
    let active = 0
    let storeSetTime
    let animationPre = wx.createAnimation({
      transformOrigin: '50% 50%',
      duration: 300,
      timingFunction: 'ease',
      delay: 0
    })
    let animationT = wx.createAnimation({
      transformOrigin: '50% 50%',
      duration: 300,
      timingFunction: 'ease',
      delay: 0
    })
    let animationNext = wx.createAnimation({
      transformOrigin: '50% 50%',
      duration: 300,
      timingFunction: 'ease',
      delay: 0
    })
    if (!this.$isLock) {//锁屏控制
      this.$isLock = true
      if (dire == 'bottom' || dire == 'top' || !dire) {
        this.$isLock = false
        return false
      }
      if (dire == 'right') {
        animationPre.translate3d('0', 0, 0).step()
        animationT.translate3d('100%', 0, 0).step()
        if (this.data.answers.activeNum > this.data.answers.start) {
          active = - 1
        } else {
          this.$isLock = false
          return
        }
      }
      if (dire == 'left') {
        animationT.translate3d('-100%', 0, 0).step()
        animationNext.translate3d('0', 0, 0).step()
        if (this.data.answers.activeNum < this.data.answers.end - 1) {
          active = 1
        } else {
          this.$isLock = false
          return
        }
      }
      this.data.isFirst = true
      this.data.swiper.animationPre = animationPre.export()
      this.data.swiper.animationT = animationT.export()
      this.data.swiper.animationNext = animationNext.export()
      this.setData(this.data)

      this.data.swiper.active = this.data.swiper.active + active
      this.data.answers.activeNum = this.data.answers.activeNum + active
      setTimeout(function () {
        that.setHtmlsetHtml(active)
      }, 300)
    }
  },
  //修改页面至正常位置
  setHtmlsetHtml: function (active) {
    let animationPre = wx.createAnimation({
      transformOrigin: '50% 50%',
      duration: 0,
      timingFunction: 'ease',
      delay: 0
    })
    let animationT = wx.createAnimation({
      transformOrigin: '50% 50%',
      duration: 0,
      timingFunction: 'ease',
      delay: 0
    })
    let animationNext = wx.createAnimation({
      transformOrigin: '50% 50%',
      duration: 0,
      timingFunction: 'ease',
      delay: 0
    })
    animationPre.translate3d('-100%', 0, 0).step()
    animationT.translate3d('0', 0, 0).step()
    animationNext.translate3d('100%', 0, 0).step()

    this.data.swiper.animationPre = animationPre
    this.data.swiper.animationT = animationT
    this.data.swiper.animationNext = animationNext
    this.setData(this.data)

    //调用滑动结束回调
    if (this.isLockCall && typeof this.isLockCall == 'function') {
      this.isLockCall()
      this.isLockCall = false
    }
    this.$isLock = false
  },
  //获得手势方向
  getDirection: function (startEvent, endEvent) {
    let x = endEvent.changedTouches[0].clientX - startEvent.changedTouches[0].clientX
    let y = endEvent.changedTouches[0].clientY - startEvent.changedTouches[0].clientY
    let pi = 360 * Math.atan(y / x) / (2 * Math.PI)
    if (pi < 25 && pi > -25 && x > 0 && Math.abs(x) > 10) {
      return 'right'
    }
    if (pi < 25 && pi > -25 && x < 0 && Math.abs(x) > 10) {
      return 'left'
    }
    if ((pi < -75 || pi > 750) && y > 0 && Math.abs(y) > 10) {
      return 'bottom'
    }
    if ((pi < -75 || pi > 75) && y < 0 && Math.abs(y) > 10) {
      return 'top'
    }
  },
  getSubject: function () {
    Object.assign(this.data.answers.activeNum, this.data.storageData.swiper.active)
    //注册滑动结束回调
    if (this.$isLock) {
      this.isLockCall = function () {
        this.data.swiper.active = this.data.answers.activeNum - this.data.answers.start
        this.data.answers.allList = this.data.answers.allList
        this.data.isLoading = false
        this.data.isFirst = true
        this.setData(this.data)
      }
    } else {
      this.data.swiper.active = this.data.answers.activeNum - this.data.answers.start
      this.data.answers.allList = this.data.answers.allList
      this.data.isLoading = false
      this.data.isFirst = true
      this.setData(this.data)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
    // 获取数据
    if (this.data.isLocal) {
      try {
        let localData = wx.getStorageSync('mini-python')
        if (localData) {
          Object.assign(this.data.storageData.answers, localData['answers'])
          Object.assign(this.data.storageData.swiper, localData['swiper'])
        } else {
          this.data.storageData.answers['allList'] = questionData.data
        }
      } catch (e) {
        console.log('获取本地缓存数据失败，' + e)
      }
    } else {

    }
    // 
    this.data.answers.allList = this.data.storageData.answers['allList']
    this.data.answers.success = this.data.storageData.answers['success'] || 0
    this.data.answers.error = this.data.storageData.answers['error'] || 0
    this.data.answers.loading = false
    this.data.swiper.active = this.data.storageData.swiper['active'] || 0
    this.setData(this.data)
    this.getSubject()
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
    try {
      this.data.storageData.answers = this.data.answers
      this.data.storageData.swiper = this.data.swiper
      wx.setStorageSync('mini-python', this.data.storageData)
    } catch (e) {
      console.log('onHide写入本地缓存失败，' + e)
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    try {
      this.data.storageData.answers = this.data.answers
      this.data.storageData.swiper = this.data.swiper
      wx.setStorageSync('mini-python', this.data.storageData)
    } catch (e) {
      console.log('onUnload写入本地缓存失败，' + e)
    }
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