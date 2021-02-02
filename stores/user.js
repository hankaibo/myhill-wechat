import {
  observe
} from 'minii';
const base64 = require("../images/base64");

class UserStore {
  constructor() {
    this.avatarUrl = base64.icon60;
    this.nickName = '游客';
  }

  changeAvatar(url) {
    this.avatarUrl = url;
  }

  changeNickname(name) {
    this.nickName = name;
  }
}

export default observe(new UserStore(), 'user');