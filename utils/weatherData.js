
//获取当前位置坐标
function getLocation(callback) {
    wx.getLocation({
        success: function (res) {
            callback(true, res.latitude, res.longitude);
        },
        fail: function () {
            callback(false);
        }
    })
}

//Reverse Geocoding 根据经纬度获取城市名称
function getCityName(latitude, longitude, callback) {
    var baiduAk="00696cfe878e5d8d5b737a2a9713d8f8";
    var apiURL = "http://api.map.baidu.com/geocoder/v2/?output=json&location=" + latitude + "," + longitude + "&ak="+baiduAk;
    wx.request({
        url: apiURL,
        success: function (res) {
            console.log(res)
            callback(res.data["result"]["addressComponent"]["city"]);
        }
    });
}

//获取指定位置的天气信息
function getWeatherByLocation(latitude, longitude, callback) {
    var apiKey = "dd1139a32dedba5b7d44041c1b857c82"; // darkSky key
    var apiURL = "https://api.darksky.net/forecast/" + apiKey + "/" + latitude + "," + longitude + "?lang=zh&units=ca";
    wx.request({
        url: apiURL,
        success: function (res) {
            var weatherData = parseWeatherData(res.data);
            getCityName(latitude, longitude, function (city) {
                weatherData.city = city;
                callback(weatherData);
            });

        }
    });

}

//解析天气数据
function parseWeatherData(data) {
    var weather = {};
    weather["current"] = data.currently;
    weather["daily"] = data.daily;
    return weather;
}

//将时间戳格式化为日期
function formatDate(timestamp) {
    var date = new Date(timestamp * 1000);
    return date.getMonth() + 1 + "月" + date.getDate() + "日 " + formatWeekday(timestamp);
}

//将时间戳格式化为时间
function formatTime(timestamp) {
    var date = new Date(timestamp * 1000);
    return formatString(date.getHours()) + ":" + formatString(date.getMinutes());
}


//中文形式的每周日期
function formatWeekday(timestamp) {
    var date = new Date(timestamp * 1000);
    var weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    var index = date.getDay();
    return weekday[index];
}
// 小于于10补0
function formatString(s){
    return s.toString().replace(/^(\d)$/,"0$1")
}

//加载天气数据
function requestWeatherData(cb) {

    getLocation(function (success, latitude, longitude) {

        //如果 GPS 信息获取不成功， 设置一个默认坐标
        if (success == false) {

            latitude = 22.54605355;
            longitude = 114.02597366;

        }
        //请求天气数据 API
        getWeatherByLocation(latitude, longitude, function (weatherData) {

            cb(weatherData);

        });

    });

}

function loadWeatherData(callback) {

    requestWeatherData(function (data) {

        //对原始数据做一些修整， 然后输出给前端
        var weatherData = {};
        weatherData = data;
        weatherData.current.formattedDate = formatDate(data.current.time);
        weatherData.current.formattedTime = formatTime(data.current.time);
        weatherData.current.temperature = parseInt(weatherData.current.temperature);

        var wantedDaily = [];
        for (var i = 1; i < weatherData.daily.data.length; i++) {

            var wantedDailyItem = weatherData.daily.data[i];
            var time = weatherData.daily.data[i].time;
            wantedDailyItem["weekday"] = formatWeekday(time);
            wantedDailyItem["temperatureMin"] = parseInt(weatherData.daily.data[i]["temperatureMin"])
            wantedDailyItem["temperatureMax"] = parseInt(weatherData.daily.data[i]["temperatureMax"])

            wantedDaily.push(wantedDailyItem);

        }

        weatherData.daily.data = wantedDaily;
        callback(weatherData);

    });

}


module.exports = {

    loadWeatherData: loadWeatherData

}
