// pages/music-play/music-play.js
var util = require("../../utils/util")
Page({
  data: {
    iconUrl: 'icon-pause.png',
    currentDuration: '00:00',
    duration: '00:00',
    isPlaying: true
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.id)
    var _this = this;
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        method: 'baidu.ting.song.play',
        songid: options.id
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)

        _this.setData({
          src: res.data.bitrate.file_link,
          name: res.data.songinfo.title,
          poster: res.data.songinfo.pic_premium,
          author: res.data.songinfo.author,
          CoverImg: res.data.songinfo.pic_premium

        })

        wx.playBackgroundAudio({
          dataUrl: _this.data.src,
          title: _this.data.name,
          coverImgUrl: _this.data.CoverImg,
          success: function (res) {
            // success
            console.log(res)
            _this.progress();
          }
        })
        wx.setNavigationBarTitle({
          title: _this.data.name
        })
      },

    })



  },
  controlHandle: function (e) {
    // body...
    if (this.data.isPlaying) {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlaying: false,
        iconUrl: 'icon-play.png'
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.data.src,
        title: this.data.name,
        coverImgUrl: this.data.CoverImg
      })
      this.setData({
        isPlaying: true,
        iconUrl: 'icon-pause.png'
      })
    }
  },
  onReady: function () {
    // 页面渲染完成
    var _this = this;
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        // success
        console.log(res)
        _this.setData({
          duration: util.formatTimetoStr(res.duration)
        })
      },

    })
    wx.onBackgroundAudioPause(function () {
      // callback
      console.log('暂停了');
      _this.setData({
        isPlaying: false,
        iconUrl: 'icon-play.png'
      })

    })
    wx.onBackgroundAudioPlay(function () {
      // callback
      console.log('播放了');
      _this.setData({
        isPlaying: true,
        iconUrl: 'icon-pause.png'
      })

    })
  },
  progress: function () {
    let timer = null, _this = this;
    timer = setInterval(function () {
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          _this.setData({
            progress: parseInt(res.currentPosition / res.duration * 100),
            currentDuration: util.formatTimetoStr(res.currentPosition)
          })

          if (_this.data.progress == 100) {
            _this.setData({
              isPlaying: false
            })
          }
        }
      })
    }, 1000)
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})