// const remote = 'http://192.168.0.102:8080';
const remote = 'https://wantongcun.com';

const request = (url, method = 'GET', data) => {
  let promise = new Promise((resolve, reject) => {
    wx.request({
      url: `${remote}${url}`,
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