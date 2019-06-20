var app = getApp()
var getData = require('../../utils/util.js')
var apix = require('../../utils/conapi.js')
var api = require('../../utils/api.js')
var requestUrl = "https://route.showapi.com/255-1";
var curPage = 1;
var isPullDownRefreshing = false;

Page({
  data:{
    // text:"这是一个页面"
    userInfo:{},
    list:{},
    jokes:{},
    listtt:{},
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏
    searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏
    listuser:[]
  },
  onLoad:function(options){
    var that = this
    var cid = options.cid
    console.log("-------cid---------" + cid)
    if(cid=1){
      curPage=1;
    }
    app.getUserInfo(function(res) {
      that.setData({
        userInfo: res
      })
    })
    this.fetchJoke()
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    console.log("-------监听页面初次渲染完成---------")
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    console.log("-------监听页面显示---------")
    curPage=1;
    this.fetchJoke()
  },
  onHide:function(){
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    //this. fetchJoke()
    console.log("-------监听页面卸载---------")
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    console.log("-------监听用户下拉动作--------")
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数   
    console.log("-------触底事件的处理函数  --------")

  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  searchScrollLower: function () {
    
    let that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      // curPage = curPage + 1;
       that.setData({
        isFromSearch: false  //触发到上拉事件，把isFromSearch设为为false
      });
      this.fetchJoke();
    }
  },
    
  fetchJoke(){
      wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000,
    });
    console.log("-------23----fdsafdsf---------" + curPage)
    wx.showNavigationBarLoading();
    var that = this;
    var token = wx.getStorageSync('token')
    wx.request({
      url: apix.selectContotList,
      data: {
        'pageNumber':curPage.toString(),
        'token': token
      },
      method: 'GET',
      success: function(res){
        // success
        that.setData({
          listtt:res
        })
        if (res.data.result.hvQcuy){
          console.log("-------23----fdsafdsf---------" + res.data.result.pageNumber)
          if (curPage == 1)
            that.setData({
              jokes: res.data.result.infoList,
              searchLoading: true
            });
          else
            that.setData({
              jokes: that.data.jokes.concat(res.data.result.infoList),
              searchLoading: true
            });
          curPage = curPage + 1;          
        }else{        
          that.setData({
            searchLoading: false,
            searchLoadingComplete: true
          });
        }
        wx.hideNavigationBarLoading();
        if (isPullDownRefreshing)
          wx.stopPullDownRefresh();
        wx.hideToast();
        }
      
    })
  },

 

})