//index.js
//获取应用实例
var weatherData = require('../../utils/weatherData.js')
var app = getApp()
Page({
  data: {
    buttonsText: '获取天气',
    weather: [1,2,3,4]
  },
  onLoad:function(){
    var _this=this;
    weatherData.loadWeatherData(function(data){
      console.log(data);
      _this.setData({
        weather:data
      })
    })
    
  },
  onPullDownRefresh:function(){
    this.onLoad()
     
  }
})
