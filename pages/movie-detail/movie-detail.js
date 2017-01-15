// pages/movie-detail/movie-detail.js
Page({
  data: {
    id: '',
    title: ''
  },
  onLoad: function (options) {
    var _this = this;
    // 页面初始化 options为页面跳转所带来的参数;
    _this.setData({
      id: options.id
    })

    console.log(this.data.id);
    wx.request({
      url: 'https://api.douban.com/v2/movie/subject/' + _this.data.id,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res);

        _this.setData({
          title: res.data.title,
          detailInfo: res.data
        })


      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        wx.setNavigationBarTitle({
          title: _this.data.title
        })
      }
    })


  }
})