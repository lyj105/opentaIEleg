const app = getApp();
var apix = require('../../utils/conapi.js')
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    //canIUse: wx.canIUse('button.open-type.getUserInfo')
    canIUse:true
  },
  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
              that.queryUsreInfo();
              //用户已经授权过
              wx.switchTab({
                url: '/page/moments/moments'
              })
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    //判断用户是不是已经授权运动步数
    

    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      app.globalData.userInfo = e.detail.userInfo;
      //插入登录的用户的相关信息到数据库  
      console.log("授权登录--------------")

      wx.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: apix.urlPath,
              data: {
                code: res.code,
                userName: e.detail.userInfo.nickName,
                userImage: e.detail.userInfo.avatarUrl
              },
              success: function (res) {
                console.log("======授权返回参数token==========" + res.data.token)
                console.log("======授权返回参数sessionKey==========" + res.data.sessionKey)
                wx.setStorage({key: 'token',data: res.data.token})
                  //授权成功后，跳转进入小程序首页
                  that.inextRunFitness(res.data.sessionKey,res.data.token);
                  wx.switchTab({
                    url: '/page/fitness/fitness?token='+res.data.token
                  })
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //写入数据看
  inextRunFitness: function (sessionKey,token) {
    //var sessionKey = wx.getStorageSync('sessionKey')
    //var token = wx.getStorageSync('token');
    console.log("======inextRunFitness==========" + token)
    var that = this
    wx.getWeRunData({
      success(res) {
        console.log(res)
        wx.request({
          url: apix.inextRunFitness,
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            "token": token,
            "encryptedData": res.encryptedData,
            "iv": res.iv,
            "sessionKey": sessionKey
          },
          success: function (res) {
            console.log(res)
            wx.hideLoading()
          }
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '未开通微信运动，请关注“微信运动”公众号后重试',
          showCancel: false,
          confirmText: '知道了'
        })
      }
    })
  },
  openSetting:function(e){
    console.log(e)
  }
})
