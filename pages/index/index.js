//index.js
const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
};

const weatherColorMap = {
 'sunny': '#cbeefd',
 'cloudy': '#deeef6',
 'overcast': '#c6ced2',
 'lightrain': '#bdd5e1',
 'heavyrain': '#c5ccd0',
 'snow': '#aae1fc'
};

const QQMapWX = require('../../libs/qqmap-wx-jssdk.js')

Page({
  data: {
    nowTemp: '',
    nowWeather: '',
    nowWeatherBackground: '',
    hourlyWeather: [],
    todayTemp: '',
    todayDate: ''
  },
  onPullDownRefresh() {
    this.getNow(()=> {
      wx.stopPullDownRefresh()
    })
  },

  onLoad() {
    this.getNow();
    this.qqmapsdk = new QQMapWX({
      key: 'EAXBZ-33R3X-AA64F-7FIPQ-BY27J-5UF5B'
    })
  },

  getNow(callback) {
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

        this.setNow(result);
        this.setHourlyWeather(result);
        this.setToday(result);

      },
      complete: ()=> {
        callback && callback()
      }
    })
  },

  setNow(result) {
    let temp = result.now.temp
    let weather = result.now.weather

    this.setData({
      nowTemp: temp + '°C',
      nowWeather: weatherMap[weather],
      nowWeatherBackground: '/images/' + weather + '-bg.png'
    })

    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: weatherColorMap[weather]
    })
  },

  setHourlyWeather(result) {
    //set hourlyWeather
    let forecast = result.forecast
    let hourlyWeather = []
    let nowHour = new Date().getHours()
    for (let i = 0; i < 8; i += 1) {
      hourlyWeather.push({
        time: (i*3 + nowHour) % 24 + "时",
        iconPath: '/images/'+ forecast[i].weather +'-icon.png',
        temp: forecast[i].temp + "°C"
      })
    }
    hourlyWeather[0].time = '现在'
    this.setData({
      hourlyWeather: hourlyWeather
    })
  },

  setToday(result) {
    let date = new Date()
    this.setData({
      todayTemp: `${result.today.minTemp}° - ${result.today.maxTemp}°`,
      todayDate: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} 今天`
    })
  },

  onTapDayWeather() {
    wx.navigateTo({
      url: '/pages/list/list'
    })
  },

  onTapLocation() {
    wx.getLocation({
      success: res => {
        // console.log(res.latitude, res.longitude);
        this.qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: res => {
            let city = res.result.address_component.city
            console.log(city);
          }
        })
      }
    })
  }
})
