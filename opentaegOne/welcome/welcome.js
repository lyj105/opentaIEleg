const app = getApp()
Page({
  onTap(event) {
    // 要想跳转到带有 tab的页面，必须使用 switchTab
    wx.switchTab({
      url:"../index/index"
    });
  },
  onLoad() {
    //调用应用实例的方法获取全局数据
    app.getUserInfo((userInfo)=>{
      //更新数据
      this.setData({
        userInfo:userInfo
      })
    })
  }
})
