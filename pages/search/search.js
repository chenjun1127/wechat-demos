//search.js
Page({
  data: {
    randomText: ['张艺谋', '长城', '姜文', '动作', '科幻', '美剧', '摆渡人', '神奇动物在哪里'],
    tags: ['韩国', '儿童', '友情', '剧情', '2016', '青春', '人性', '文艺'],
    show: true,
    initValue:"",
    noContentShow: false // 有无搜索到内容，默认隐藏
  },
  onLoad: function () {

    this.setData({
      randomValue: this.data.randomText[Math.floor(Math.random() * this.data.randomText.length)]
    })
  },
  // 失去焦点请求数据
  searchEvent: function (event) {
    //console.log(event.detail.value);
    var inputValue = event.detail.value;
    var _this = this;

    if (!/^\s*$/g.test(inputValue)) {
      _this.setData({
        searchValue: event.detail.value,
        show: false
      })
      _this.requestEvent(_this.data.searchValue)
    } else {
      _this.setData({
        searchValue: _this.data.randomValue,
        show: false
      })
      _this.requestEvent(_this.data.searchValue)
    }


  },
  // 取消
  cancelEvent: function () {
    this.setData({
      show: true,
      searchMovieList: '',
      initValue:'',
      randomValue: this.data.randomText[Math.floor(Math.random() * this.data.randomText.length)],
      noContentShow: false
    })

  },
  tagsEvent: function (event) {
    console.log(event.target.dataset.text);
    this.setData({
      show: false,
      initValue:'',
      noContentShow:false,
      randomValue: event.target.dataset.text
    })
    this.requestEvent(event.target.dataset.text)
  },
  movieDetail: function (event) {
    const movieId = event.target.dataset.id;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId,
    })
  },
  requestEvent: function (data) {
    var _this = this;
    wx.request({
      url: 'https://api.douban.com/v2/movie/search',
      data: {
        q: data
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // success
        if (res.data.subjects != 0) {
          _this.setData({
            searchMovieList: res.data.subjects
          })
        } else {
          _this.setData({
            noContentShow: true,
            searchMovieList: ''
          })
        }

        console.log(_this.data.searchMovieList)
      }
    })
  }

})
