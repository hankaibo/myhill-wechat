import {
  app,
} from '../stores/index.js';

const request = (url, method = 'GET', data) => {
  let promise = new Promise((resolve, reject) => {
    wx.request({
      url: `${app.getRemote()}${url}`,
      method,
      data,
      header: {
        Authorization: `Bearer ${wx.getStorageSync('miniToken')}`,
      },
      success: function (res) {
        resolve(res);
      },
      fail: function (e) {
        reject(e)
      }
    })
  });
  return promise;
}
module.exports = {
  request
}