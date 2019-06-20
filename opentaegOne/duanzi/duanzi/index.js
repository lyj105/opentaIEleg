//index.js
//获取应用实例
var app = getApp()
var curPage = 1;
var isPullDownRefreshing = false;
var apix = require('../../utils/conapi.js')
Page({
  data: {
    systemInfo: {},
    motto: 'Hello World',
    userInfo: {},
    jokes :[],
    swipse:[]
  },

  lower:function(){
    console.log("reach to lower...");
    var that = this;
    this.fetchJoke();
    //轮播图
   
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    this.fetchJoke();
  //  
     this.getSwipperfwq();
  
    app.getSystemInfo(function(res) {
      that.setData({
        systemInfo: res
      })
    })
  
  },
  onPullDownRefresh:function(){
    console.log('onPullDownRefresh...');
    curPage = 1;
    isPullDownRefreshing = true;
    this.fetchJoke();
  },

   

    getSwipperfwq:function(){
     var  that=this
              apix.getHotlunbo({
                success: (res) => {
                  var sad=res.data.result
                  that.setData({
                    swipse: sad,
                  });
      },
    });
  },

  fetchJoke:function(){
    wx.showNavigationBarLoading();
    var that = this;
 
    wx.request({
      url: app.globalData.showapi,
      data: {
        'showapi_appid':app.globalData.appid,
        'showapi_sign':app.globalData.apiKey,
        'page':curPage.toString(),
        'type':app.globalData.tText
      },
      method: 'GET',
      success: function(res){
        // success
        console.log("查询返回的结果集");
        console.log(res)
        console.log(res.data.showapi_res_body.contentlist);
        if(curPage == 1)
          that.setData({ 
            jokes:res.data.showapi_res_body.contentlist 
            });
        else
          that.setData({ 
            jokes: that.data.jokes.concat(res.data.showapi_res_body.contentlist) 
            });

        curPage = curPage + 1;
        wx.hideNavigationBarLoading();
        if(isPullDownRefreshing)
          wx.stopPullDownRefresh();
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onShareAppMessage: function () {
  var that=this;
  var dat=that.data.jokes[0].text;
    return {
      title: dat,
      path: 'pages/duanzi/index'
     // path:redirect_man_url+'id='+event.currentTarget.id
    }
  },
})

