import {
  observe
} from 'minii'

class App {
  constructor() {
    this.remote = 'http://192.168.0.108:8080';
    this.useSystem = false;
    this.theme = 'dark';
  }

  changeUseSystem(value) {
    this.useSystem = value;
  }

  changeTheme(theme) {
    this.theme = theme;
  }

  setRemote(remote) {
    this.remote = remote;
  }
  getRemote() {
    return this.remote;
  }

  setTheme(theme) {
    this.theme = theme;
  }
  getTheme() {
    return this.theme;
  }
}

export default observe(new App(), 'app');