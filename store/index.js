const Store = require('wxministore');
const base64 = require("../images/base64");

export default new Store({
  state: {
    //以下为自定义的全局状态，用法和页面中的data: {...} 一致。
    useSystem: false,
    theme: 'dark',
    openid: '',
    user: {
      nickName: '',
      avatarUrl: base64.icon60,
      gender: 0,
      country: '',
      province: '',
      city: '',
      language: '',
    },
  },
  methods: {},
  pageListener: {
    onLoad(options) {
      console.log('我在' + this.route, '参数为', options);
    },
    onHide() {},
  },
})