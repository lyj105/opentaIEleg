var api = require('../../utils/api.js')

var apix = require('../../utils/conapi.js')
var app = getApp()
Page({
  data: {
    systemInfo: {},
    _api: {},
    navbar: ['推荐', '新作', '展览'],
    currentNavbar: '0',
    swipers: [
   
    ],
    
    list: [
    ],
    hot_last_id: 0,
    latest_list: [],
    latest_last_id: 0,
    // fws
    list_:{}, 
//服务器服务器 
  swipse:[    
    ],
    weixinlist:[]
  },
  onLoad () {
    var that = this
    app.getSystemInfo(function(res) {
      that.setData({
        systemInfo: res
      })
    })
    that.setData({
      _api: api
    })
    this.getSwipperfwq()//服务器
    this.pullUpLoad()
  },
  /**
   *
   */
  //轮播图
   getSwipers () {
     api.get(api.SWIPERS)
       .then(res => {
         console.log(api.SWIPERS+"------------------"+res.data.ads)
         this.setData({
           swipers: res.data.ads
         })
       })
   },
  //服务器轮播图片
  getSwipperfwq(){
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
   


  /**
   * 点击跳转详情页
   */
  onItemClick (e) {
    var targetUrl = api.PAGE_WORK
  console.log(targetUrl)
    targetUrl = targetUrl + '?id=' + e.currentTarget.dataset.rowId+'&ttitle=' + e.currentTarget.dataset.rowName
    wx.navigateTo({
      url: targetUrl
    })
  },

  /**
   * 切换 navbar
   */
  swichNav (e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    })
    if (e.currentTarget.dataset.idx == 1 && this.data.latest_list.length == 0) {
      this.pullUpLoadLatest()
    }
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh () {
    switch (this.data.currentNavbar) {
      case '0':
        this.setData({
          list: [],
          hot_last_id: 0
        })
        this.pullUpLoad()
        break
      case '1':
        this.setData({
          latest_list: [],
          latest_list_id: 0
        })
        this.pullUpLoadLatest()
        break
      case '2':
        wx.stopPullDownRefresh()
        break
    }
  },
   /**从服务器获取数据 */

  pullUpLoad () {
    var  that=this
    wx.showNavigationBarLoading()
    api.get(api.APIURL+api.HOST_JOK)
      .then(res => {
        console.log("00000000000"+res.data.msg)
        that.setData({
          list: res.data.result
        })
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      })
  },




  /**
   * [最新]上拉刷新
   */
  pullUpLoadLatest () {
    wx.showNavigationBarLoading()
    api.get(api.HOST_IOS + api.LATEST + '?last_id=' + this.data.latest_last_id)
      .then(res => {
        this.setData({
          latest_list: this.data.latest_list.concat(res.data.list),
          latest_last_id: res.data.last_id
        })
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      })
  },


   onShareAppMessage: function () {
  var that=this;
  var dat='【笑话】'+that.data.list[0].content;
  var ids= that.data.roId;
    return {
      title: dat,
      path: '/pages/jok/setting'
     // path:redirect_man_url+'id='+event.currentTarget.id
    }
  },

})
