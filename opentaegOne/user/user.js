
var app = getApp()
var api = require('../../utils/api.js')
var requestUrl = "https://route.showapi.com/255-1";
var curPage = 1;
var isPullDownRefreshing = false;
var apix = require('../../utils/conapi.js')
Page({
  data: {
    userInfo: {},
    list: [
      {
        list_tool: [{
            img: "../../image/friend_r.png",
            name: "朋友圈",
            url: "/page/moments/moments"
          },
          {
            img: "../../image/look.jpg",
            name: "发一发",
            url: "/page/discovlook/discovlook"
          }
        ]
      },
      {
        list_tool: [{
          img: "../../image/advice.jpg",
          name: "反馈建议",
          url: "/page/card-edit/card-edit"
        }]
      }


      // },
      // {
      //     list_tool:[
      //         {
      //             img:"../../image/money.png",
      //             name:"钱包(现在是播放器)",
      //             url:"../audio/audio"
      //         },
      //         {
      //             img:"../../image/card.png",
      //             name:"卡包（picker&switch）",
      //             url:"../picker/picker"
      //         }
      //     ]
      // },
      // {
      //     list_tool:[
      //         {
      //             img:"../../image/bq_2.png",
      //             name:"表情"
      //         },
      //         {
      //             img:"../../image/setting.png",
      //             name:"设置（系统信息）",
      //             url:"../info/info"
      //         }
      //     ]
      // },

    ],
    listuser: [],
    student:"",
    avatarUrl: {}
  },
  goPage: function(event) {
    console.log(event.currentTarget.dataset.url);
      wx.navigateTo({
      url: event.currentTarget.dataset.url
    })
  },
  onShow: function () {
    var student = wx.getStorageSync('token')
    this.setData({
      student: student
    })  
  },

  onLoad: function() {
    //wx.showNavigationBarLoading();
    var that = this
    // 查看是否授权
    this.onLaunch()

  },

  onLaunch: function() {
    var that = this
    var token = wx.getStorageSync('token')
    console.log('获取用户的token：' + token)
   // if(token==null || token==""){
      wx.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求   
            console.log('获取用户登录态sucess！' + res.code)
            wx.request({
              url: apix.urlPath,
              data: {
                code: res.code
              },
              success: function (res) {
                console.log("======获取用户登录态sucess==========" + res.data.token)
                that.setData({
                  userInfo: res.data.userInfo
                })
                wx.setStorage({ key: 'token', data: res.data.token })
                wx.setStorage({ key: 'userName', data: res.data.userInfo.userName })
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
   // }
          //发起网络请求
          wx.request({
            url: apix.weChatlogin,
            data: {
              token: token
            },
            success: function(res) {
              wx.removeStorageSync('token')
              that.setData({
                userInfo: res.data.userInfo
              })
              wx.setStorage({key: 'token', data: res.data.token})
            }
          })
  }
})
  