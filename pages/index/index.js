//index.js
Page({
  onLoad() {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '深圳市'
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log(res.data);
        let result = res.data.result;
        let temp = result.now.temp
        let weather = result.now.weather
        console.log(temp, weather);
      }
    })
  }
})
