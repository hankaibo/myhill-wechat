import {
  observe
} from 'minii';
const base64 = require("../images/base64");

class User {
  constructor() {
    this.hasLogin = false;
    this.userInfo = {
      nickName: '',
      avatarUrl: base64.icon60,
      gender: 0,
      country: '',
      province: '',
      city: '',
      language: '',
    }
  }

  getHasLogin() {
    return this.hasLogin;
  }

  setUserInfo(userInfo) {
    this.userInfo = userInfo;
    if (userInfo.nickName) {
      this.hasLogin = true;
    } else {
      this.hasLogin = false;
    }
  }
  getUserInfo() {
    this.userInfo;
  }

}

export default observe(new User(), 'user');