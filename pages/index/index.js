//index.js
const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}

Page({
  data: {
    nowTemp: '14°C',
    nowWeather: '阴天'
  },
  onLoad() {
    var that = this
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '深圳市'
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: res => {
        console.log(res.data);
        let result = res.data.result;
        let temp = result.now.temp
        let weather = result.now.weather
        console.log(temp, weather);

        this.setData({
          nowTemp: temp + '°C',
          nowWeather: weatherMap[weather]
        })
      }
    })
  }
})
