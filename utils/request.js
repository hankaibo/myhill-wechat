const userInfo = wx.getStorageSync('userInfo');
let token = null;
if (userInfo) {
  token = JSON.parse(userInfo).token;
}

const request = (url, method = 'GET', data) => {
  let promise = new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      header: {
        Authorization: `Bearer ${token}`,
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