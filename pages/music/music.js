// pages/music/music.js
Page({
  data: {
    typeid: [1, 2, 23, 24],
    show: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var _this = this;
    var img_src = [];
    _this.data.typeid.forEach(function (value, index) {
      _this.getMusicData(index)
      wx.getStorage({
        key: 'src_' + index,
        success: function (res) {
          img_src.push(res.data)
          _this.setData({
            imgSrcArr: img_src
          })
        }
      })
    })
    this.getSongsList();
  },
  onPullDownRefresh: function () {
    this.onLoad();
    this.setData({
      show: true
    })
    wx.stopPullDownRefresh();
  },
  swipclick: function (event) {
    console.log(event)
  },
  getMusicData: function (index) {
    var _this = this;
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        type: _this.data.typeid[index],
        size: 20,
        offset: 0,
        method: 'baidu.ting.billboard.billList'
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)
        var imgsrc = res.data.billboard.pic_s210;
        console.log(imgsrc)
        wx.setStorage({
          key: "src_" + index,
          data: imgsrc
        })

      }
    })
  },
  getSongsList: function () {
    var _this = this;
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        type: 22,
        size: 20,
        offset: 0,
        method: 'baidu.ting.billboard.billList'
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res.data)
        _this.setData({
          name: res.data.billboard.name,
          songList: res.data.song_list
        })
      }
    })
  },
  playMusic: function (event) { 
    const music_id = event.currentTarget.dataset.id; 
    wx.navigateTo({
      url: '../music-play/music-play?id=' + music_id,
    })
  }

})