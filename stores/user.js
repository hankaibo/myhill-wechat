import {
  observe
} from 'minii';
const base64 = require("../images/base64");

class UserStore {
  constructor() {
    this.hasLogin = false;
    this.avatarUrl = base64.icon60;
    this.nickName = '游客';
  }

  setHasLogin(hasLogin) {
    this.hasLogin = hasLogin;
  }
  getHasLogin() {
    return this.hasLogin;
  }

  setAvatarUrl(avatarUrl) {
    this.avatarUrl = avatarUrl;
  }
  getAvatarUrl() {
    this.avatarUrl;
  }

  setNickName(nickName) {
    this.nickName = nickName;
  }
  getNickName() {
    this.nickName;
  }

  changeLogin(value) {
    this.hasLogin = value;
  }

  changeAvatar(url) {
    this.avatarUrl = url;
  }

  changeNickname(name) {
    this.nickName = name;
  }
}

export default observe(new UserStore(), 'user');