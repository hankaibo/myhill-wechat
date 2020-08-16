// pages/python/python.js
//获取应用实例
const app = getApp()
const {
  request
} = require('../../utils/request.js')
const {
  formatDate
} = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户与主题
    userInfo: {},
    hasUserInfo: false,
    theme: 'dark',
    // 年级与课程
    grade: {},
    course: {},
    // 日历自定义配置
    calendarLayer: {
      isLayerShow: false, //默认弹窗
      layerAnimation: {}, //弹窗动画
    },
    calendarConfig: {
      multi: false, // 是否开启多选,
      theme: 'elegant', // 日历主题，目前共两款可选择，默认 default 及 elegant，自定义主题在 theme 文件夹扩展
      showLunar: false, // 是否显示农历，此配置会导致 setTodoLabels 中 showLabelAlways 配置失效
      inverse: false, // 单选模式下是否支持取消选中,
      chooseAreaMode: true, // 开启日期范围选择模式，该模式下只可选择时间段
      markToday: '今', // 当天日期展示不使用默认数字，用特殊文字标记
      defaultDay: true, // 默认选中指定某天；当为 boolean 值 true 时则默认选中当天，非真值则在初始化时不自动选中日期，
      highlightToday: true, // 是否高亮显示当天，区别于选中样式（初始化时当天高亮并不代表已选中当天）
      takeoverTap: true, // 是否完全接管日期点击事件（日期不会选中），配合 onTapDay() 使用
      preventSwipe: true, // 是否禁用日历滑动切换月份
      firstDayOfWeek: 'Mon', // 每周第一天为周一还是周日，默认按周日开始
      onlyShowCurrentMonth: true, // 日历面板是否只显示本月日期
      hideHeadOnWeekMode: true, // 周视图模式是否隐藏日历头部
      showHandlerOnWeekMode: true, // 周视图模式是否显示日历头部操作栏，hideHeadOnWeekMode 优先级高于此配置
      disableMode: { // 禁用某一天之前/之后的所有日期
        type: 'after', // [‘before’, 'after']
        date: false, // 无该属性或该属性值为假，则默认为当天
      },
    },
    selectedDay: formatDate(new Date()),
    // 问题
    storageData: {
      swiper: {},
      answers: {}
    },
    isLoading: false,
    isFirst: true,
    swiper: {
      active: 0
    },
    layerlayer: {
      isLayerShow: false, //默认弹窗
      layerAnimation: {}, //弹窗动画
    },
    answers: {
      start: 0, //初始题号
      allList: [], //题号数据
      activeNum: 0, //当前显示条数
      isShowTip: false //默认是否显示提示
    }
  },
  openCalendar() {
    let layerAnimation = wx.createAnimation({
      transformOrigin: '50% 50%',
      duration: 500,
      timingFunction: 'ease',
      delay: 0
    })
    if (!this.data.calendarLayer.isLayerShow) {
      layerAnimation.translateY(0).step()
    } else {
      layerAnimation.translateY('100%').step()
    }
    this.data.calendarLayer.isLayerShow = !this.data.calendarLayer.isLayerShow
    this.data.calendarLayer.layerAnimation = layerAnimation
    this.setData(this.data)
  },
  closeCalendar() {
    let layerAnimation = wx.createAnimation({
      transformOrigin: '50% 50%',
      duration: 500,
      timingFunction: 'ease',
      delay: 0
    })
    layerAnimation.translateY('100%').step();
    this.data.calendarLayer.isLayerShow = false;
    this.data.calendarLayer.layerAnimation = layerAnimation;
    this.setData(this.data)
  },
  /**
   * 日期点击事件（此事件会完全接管点击事件），需自定义配置 takeoverTap 值为真才能生效
   * currentSelect 当前点击的日期
   */
  onTapDay(e) {
    const {
      year,
      month,
      day
    } = e.detail;
    let layerAnimation = wx.createAnimation({
      transformOrigin: '50% 50%',
      duration: 500,
      timingFunction: 'ease',
      delay: 0
    })
    layerAnimation.translateY('100%').step();
    this.data.calendarLayer.isLayerShow = false;
    this.data.calendarLayer.layerAnimation = layerAnimation;
    this.data.selectedDay = formatDate(new Date(`${year}-${month}-${day}`));
    this.data.answers.activeNum = 0;
    this.setData(this.data)
    this.getData();
  },
  /**
   * 日历初次渲染完成后触发事件，如设置事件标记
   */
  afterCalendarRender(e) {
    const selectedDay = this.calendar.getSelectedDay()[0];
    const {
      year,
      month,
      day
    } = selectedDay;
    this.setData({
      selectedDay: `${year}-${month}-${day}`
    })
  },
  //单选逻辑
  tapRadio(e) {
    let thisOption = e.currentTarget.dataset.option
    let list = this.data.answers.allList[thisOption[2]].optionList.map(function (option, i) {
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
  tapSelect(e) {
    if (!this.data.isFirst || this.data.answers.allList[this.data.answers.start + this.data.swiper.active].isAnswer) {
      return false
    }

    this.data.isFirst = false
    let bool = true
    let correct = this.data.answers.allList[this.data.swiper.active]['answerList'][0].value;
    let data = this.data.answers.allList[this.data.swiper.active].optionList.map((option, i) => {
      if (option.Select && option.name != correct) {
        option.class = 'error'
        bool = false
      }
      if (!option.Select && option.name === correct) {
        option.class = 'active-success'
        bool = false
      }
      if (option.Select && option.name === correct) {
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

    this.data.answers.allList[this.data.answers.start + this.data.swiper.active].optionList = data
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
  pageClick() {
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
  layerFooterClick() {
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
  collectList() {
    let index = this.data.answers.activeNum
    this.data.answers.allList[index].isStore = !this.data.answers.allList[index].isStore
    this.setData(this.data)
  },
  //题号变更逻辑
  setActiveNum(e) {
    let thisOption = e.currentTarget.dataset.option - 0
    this.data.answers.activeNum = thisOption
    this.data.isFirst = false
    this.data.isLoading = false
    this.layerFooterClick()
    this.getSubject()
  },
  //swiper切换
  touchStart(e) {
    this.data.swiper.touchstartEvent = e
    return false
  },
  //滑动结束
  touchEnd(e) {
    this.onSwiper(this.getDirection(this.data.swiper.touchstartEvent, e))
    return false
  },
  //swiper切换
  onSwiper(dire) {
    let that = this
    let active = 0
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
    if (!this.$isLock) { //锁屏控制
      this.$isLock = true
      if (dire == 'bottom' || dire == 'top' || !dire) {
        this.$isLock = false
        return false
      }
      if (dire == 'right') {
        animationPre.translate3d('0', 0, 0).step()
        animationT.translate3d('100%', 0, 0).step()
        if (this.data.answers.activeNum > this.data.answers.start) {
          active = -1
        } else {
          this.$isLock = false
          return
        }
      }
      if (dire == 'left') {
        animationT.translate3d('-100%', 0, 0).step()
        animationNext.translate3d('0', 0, 0).step()
        if (this.data.answers.activeNum < this.data.answers.allList.length - 1) {
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
  setHtmlsetHtml(active) {
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

    //调用加载数据方法
    // if ((this.data.swiper.active == 2 && this.data.answers.start > 0) || (this.data.swiper.active + 2 == this.data.answers.list.length && this.data.answers.end < this.data.answers.allList.length)) {
    //   // this.getSubject()
    // }

    //调用滑动结束回调
    if (this.isLockCall && typeof this.isLockCall == 'function') {
      this.isLockCall()
      this.isLockCall = false
    }
    this.$isLock = false
  },
  //获得手势方向
  getDirection(startEvent, endEvent) {
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
    //注册滑动结束回调
    if (this.$isLock) {
      this.isLockCall = function () {
        this.data.swiper.active = this.data.answers.activeNum - this.data.answers.start
        this.data.isLoading = false
        this.data.isFirst = true
        this.setData(this.data)
      }
    } else {
      this.data.swiper.active = this.data.answers.activeNum - this.data.answers.start
      this.data.isLoading = false
      this.data.isFirst = true
      this.setData(this.data)
    }
  },
  // 获取数据
  getData: function () {
    const {
      grade,
      course,
      selectedDay
    } = this.data;
    request(`${app.globalData.remote}/api/v1/mini/papers/detail?gradeValue=${grade.value}&courseValue=${course.value}&date=${selectedDay}`, 'get')
      .then(({
        data
      }) => {
        this.data.answers.allList = data.questionList;
        this.data.answers.success = data.correctNumber || 0;
        this.data.answers.error = data.errorNumber || 0;
        this.data.answers.loading = false;
        this.setData(this.data);
        this.getSubject();
      })
      .catch(e => {
        console.log(e)
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        theme: app.globalData.theme,
        hasUserInfo: true
      })
    }
    // 监听acceptDataFromOpenerPage事件， 获取上一页面通过eventChannel传送到当前页面的数据
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', data => {
      this.setData({
        grade: data.grade,
        course: data.course
      })
    })

    this.getData();

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