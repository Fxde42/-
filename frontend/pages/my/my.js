Page({

    data:{
       avatarbase64:'',
        nickname:'',
        imgURL:'',
    },
    
      onShow(){
          const nickname = wx.getStorageSync('nickname')
          const imgURL = wx.getStorageSync('imgURL')
          const avatarbase64 = wx.getStorageSync('avatarbase64')
          this.setData({
            avatarbase64:avatarbase64,
              nickname:nickname,
              imgURL:imgURL,
          })
      },
 
      login(){
          wx.login({
            success: (res) => {
              let code = res.code
              wx.request({
                url: `http://47.120.67.220:8080/weixin/miniapp/login/${code} `,
                method:'GET',
                header:{
                    'Content-type':"application/json"//设置数据的交互格式
                },
                success:(res)=>{
                    console.log(res);
                    const jsonString = res.data
                    const openid = jsonString.data.openid
                    const nickname = jsonString.data.nickName
                    const imgURL = jsonString.data.imgURL
                    const gender = jsonString.data.gender
                    const phone = jsonString.data.phone
                    wx.setStorageSync('openid', openid)
                    wx.setStorageSync('nickname', nickname)
                    wx.setStorageSync('avatarbase64', imgURL)
                    wx.setStorageSync('gender', gender)
                    wx.setStorageSync('phone', phone)
                    if(!nickname){
                        wx.navigateTo({
                            url: '../login/login',
                            
                          })
                    }
                    else{
                        this.setData({
                            avatarbase64:wx.getStorageSync('avatarbase64'),
                            nickname:wx.getStorageSync('nickname')
                        })
                    }
                }
              })
            },
          })
          
  

      },

      exit(){
          wx.removeStorageSync('nickname')
          wx.removeStorageSync('imgURL')
          wx.removeStorageSync('gender')
          wx.removeStorageSync('phone')
          wx.removeStorageSync('avatarbase64')
          wx.removeStorageSync('openid')
          
          this.setData({
              sex:'',
              phoneNum:'',
              nickname:'',
              imgURL:''
          })
  
          wx.showToast({
            title: '退出成功',
            duration: 2000,
            icon: 'success',
            mask: true,
  
          })
      }
    
  })
  