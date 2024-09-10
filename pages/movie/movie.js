// pages/movie/movie.js
Page({
  data: {
    movieText: '',
    movieList: ''
  },
  onLoad: function () {
    var _this = this;
    wx.request({
      url: 'https://api.douban.com/v2/movie/in_theaters',
      data: {},
      // header: {}, // 设置请求的 header
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT      
      success: function (res) {
        // success
        let listData = res.data.subjects;
        _this.setData({
          movieList: listData
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  movieDetail: function (event) {
    const movieId = event.target.dataset.id;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId,
    })
  },
  onPullDownRefresh:function(){
    this.onLoad()
     
  }

})