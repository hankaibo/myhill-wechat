// components/gallery/index.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrls: {
      type: Array,
      value: [],
      observer(newVal) {
        this.setData({
          currentImgs: newVal
        })
      }
    },
    show: {
      type: Boolean,
      value: true
    },
    current: {
      type: Number,
      value: 0
    },
    indicatorDots: {
      type: Boolean,
      value: true
    },
    autoplay: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentImgs: []
  },
  ready() {
    const data = this.data
    this.setData({
      currentImgs: data.imgUrls
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    change(e) {
      this.setData({
        current: e.detail.current
      })
      this.triggerEvent('change', {
        current: e.detail.current
      }, {})
    },
    enter() {
      this.triggerEvent('goto', {}, {})
    },
  }
})