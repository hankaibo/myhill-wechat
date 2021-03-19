import {
  observe
} from 'minii'

class App {
  constructor() {
    this.remote = 'http://192.168.0.108:8080';
    // this.remote = 'https://wantongcun.com';
    this.useSystem = false;
    this.theme = 'dark';
  }

  setUseSystem(useSystem) {
    this.useSystem = useSystem;
  }
  getUseSystem() {
    return this.useSystem;
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