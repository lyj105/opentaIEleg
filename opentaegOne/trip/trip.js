const api = require('../../utils/api.js');

const app = getApp();
Page({
  data: {
    trip: {},
    options: null,
    windowWidth: 0,
    systemInfo: {},

  },
  onReady() {
    const self = this;
    wx.setNavigationBarTitle({
      title: self.data.options.name,
    });
  },
  onLoad(options) {
    const self = this;
    const id = options.id;
    app.getSystemInfo(function(res) {
      console.log("----------ssssssssssssssssssssssss---"+res.windowWidth)
      self.setData({
        systemInfo:res,
        windowWidth:res.windowWidth
      })
    });

     self.setData({
       options
     });


    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000,
    });
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
  },
  viewWaypoint(e) {
    const self = this;
    const ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../waypoint/waypoint?waypointId=${ds.waypoint}&tripId=${self.data.trip.id}`,
    });
  },
  gotoUser(e) {
    const userId = e.target.dataset.id;
    wx.navigateTo({
      url: `../user/user?id=${userId}`,
    });
  },
});
