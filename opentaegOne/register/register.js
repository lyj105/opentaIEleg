var api = require('../../utils/api.js')

var apix = require('../../utils/conapi.js')
var app = getApp()
Page({
  data: {
     poster: 'http://img.kaiyanapp.com/441b1d3cd214c9f972e97b252acd69e1.jpeg?imageMogr2/quality/60/format/jpg',
     systemInfo: {},
     contols:true,
     autoplay:false,
     rowId:1,
     list:[],
    src: 'http://5465465.oss-cn-qingdao.aliyuncs.com/1493972299877_20428_854x480.mp4',
     isPlayingMusic: false

  },

 onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },


  onLoad () {
  var that = this
    app.getSystemInfo(function(res) {
      that.setData({
        systemInfo: res
      })
    })

     this.pullUpLoad()


 api.getTripInfoByID({
      query: {
        tripId: id,
      },
      success: (res) => {
        const trip = res.data;
        self.setData({
          trip,
        });
        wx.hideToast();
      },
    });

  this.setMusicMonitor()

  },
 audioyPlay :function (e) {  
   var  row=e.currentTarget.dataset.rowId;  
 // (num%2 ==0) ?"偶数":"奇数"
   console.log("dasdasssssssssssssssssss"+row)
   var that = this
  if(row%2==0){
   that.setData({
       contols:true,
       rowId:1
    })
  }else{
     that.setData({
       contols:false,
       rowId:2
    })
  }  
     var inputValue = e
     that.videoContext.play()
     that.setData({
       autoplay:true
    })
  },

 pullUpLoad () {
   // wx.showNavigationBarLoading()
  console.log("==4444444444=d==ddddd"+api.APIURL+api.HOSTST_WEISN+'&pageNumber=' + this.data.hot_last_id)
    //api.HOST_IOS + api.HOT + '?last_id=' + this.data.hot_last_id +'&pageNumber=' + this.data.hot_last_id
    api.get('https://www.aeeceo.com/openApi/videolist.htm?pageNumber=1')
      .then(res => {
        console.log("00000000000"+res.result.rentResultEnum)
        this.setData({
          list:res.data.result.pageList,
         // list: this.data.list.concat(res.data.result.pageList),
          hot_last_id: res.data.result.pageNumber
        })
        //wx.hideNavigationBarLoading()
      //  wx.stopPullDownRefresh()
      })
  },
   


  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  },

  bindPickerChange (e) {
    this.setData({
      index: e.detail.value
    })
  },

  bindMobileInput (e) {
    console.log(e.detail.value)
    this.setData({
      mobile: e.detail.value
    })
  },

  bindGetVerification () {
    let that = this
    api.post(api.GET_VERIFICATION, {
      area: parseInt(this.data.arrayNum[this.data.index]),
      mobile: parseInt(this.data.mobile),
      type: 'sign'
    }).then(res => {
      console.log(res)
      // 后台验证了来源，故无法获取正确返回
    })
  },

  onShareAppMessage: function () {
  var that=this;
  var dat='笑傲视频'
  var ids= that.data.roId;
    return {
      title: dat,
      path: '/pages/register/register'
     // path:redirect_man_url+'id='+event.currentTarget.id
    }
  },


















  formSubmit: function(e) {
    console.log(e.detail.value)
  }




  
})
