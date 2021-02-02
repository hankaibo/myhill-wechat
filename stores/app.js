import {
  observe
} from 'minii'

class App {
  constructor() {
    this.remote = 'http://192.168.0.108:8080';
    this.useSystem = true;
    this.theme = 'dark';
  }

  changeUseSystem(value) {
    this.useSystem = value;
  }

  changeTheme(theme) {
    this.theme = theme;
  }
}

export default observe(new App(), 'app');