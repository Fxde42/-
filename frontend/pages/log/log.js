// pages/log/log.js
Page({
  data: {
    his:[]
  },
  onShow(){
      wx.request({
        url: `http://47.120.67.220:8080/weixin/miniapp/herb/history/${wx.getStorageSync('openid')}`,
        method:'GET',
        success:(res)=>{
            this.setData({
                his:res.data.data
            })
            

        }
      })
  }
})