// components/select/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    options: {
      type: Array,
      value: []
    },
    defaultOption: {
      type: Object,
      value: {
        id: '',
        name: '请选择年级'
      },
    },
    key: {
      type: String,
      value: 'id'
    },
    text: {
      type: String,
      value: 'name'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    result: [],
    isShow: false,
    current: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChange(e) {
      let dataset = e.target.dataset;
      this.setData({
        current: dataset,
        isShow: false
      });
      this.triggerEvent('change', {
        ...dataset
      })
    },
    handleShow() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    close() {
      this.setData({
        isShow: false
      })
    },
    formatData(dataList) {
      let result = [];
      if (this.data.key !== 'id' || this.data.text !== 'name') {
        for (let item of dataList) {
          let {
            [this.data.key]: id, [this.data.text]: name
          } = item;
          result.push({
            id,
            name
          })
        }
      } else {
        result = [...dataList]
      }
      return result;
    },
  },
  lifetimes: {
    attached() {
      const result = this.formatData(this.data.options);
      this.setData({
        current: Object.assign({}, this.data.defaultOption),
        result: result
      })
    }
  },
  observers: {
    'options': function (options) {
      const result = this.formatData(options);
      this.setData({
        result
      })
    }
  }
})