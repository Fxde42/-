Page({

   
    data:{
        selectorRange:['男','女'],
        selectorIndex:0,
        phone:'',
        sex:'',
        imgURL:'',
        nickname:'',
        avatarbase64:'',
        },
    
        // 选择头像
        chooseAvatar: function (e) {
            const {imgURL} = e.detail
            this.setData({
                imgURL:imgURL
            })
            console.log(this.data.imgURL);
            wx.setStorageSync('imgURL',this.data.imgURL)
            wx.getFileSystemManager().readFile({
                filePath:imgURL,
                encoding:'base64',
                success:function(res){
                    var base64Data = res.data
                    wx.setStorageSync('avatarbase64', base64Data)
                },
                fail(err){
                    console.log(err);
                }
            })
        },

        // 用户昵称

        leave(e){
            const {nickname} = e.detail.value
            
            this.setData({nickname:nickname})
            wx.setStorageSync('nickname',e.detail.value)
        },



        // 手机号
        handleInput:function(e){
            // this.setData({
            //     phone:e.detail.value
            // })
            wx.setStorageSync('phone', e.detail.value)
        },

    //选择性别
    onSelectorChange:function(e){
        this.setData({
            selectorIndex: e.detail.value,
            sex:this.data.selectorRange[e.detail.value]
          });
        console.log('选择的项：',this.data.selectorRange[e.detail.value]);
        wx.setStorageSync('sex', this.data.selectorRange[e.detail.value])
    },

     //存储

     onLoad(options) {
        const phone = wx.getStorageSync('phone')
        const sex = wx.getStorageSync('sex')
        const avatarUrl = wx.getStorageSync('avatarUrl')
        const nickname = wx.getStorageSync('nickname')
        const avatarbase64 = wx.getStorageSync('avatarbase64')
      this.setData({
          phone:phone,
          sex:sex,
          avatarUrl:avatarUrl,
          nickname:nickname,
          avatarbase64:avatarbase64,
      })
    },



      save(){


        const resu1 = wx.getStorageSync('phone')
        const resu2 = wx.getStorageSync('sex')
        const resu3 = wx.getStorageSync('avatarbase')
        const resu4 = wx.getStorageSync('nickname')
        const resu5 = wx.getStorageSync('avatarbase64')
        this.setData({
            phone:resu1,
            sex:resu2,
            avatarbase64:resu5,
            nickname:resu4
        })
        wx.request({
          url: 'http://47.120.67.220:8080/weixin/miniapp/user/update',
          method:'POST',
          data:{
            openid:wx.getStorageSync('openid'),
            imgURL:wx.getStorageSync('avatarbase64'),
            nickName:wx.getStorageSync('nickname'),
            gender:wx.getStorageSync('sex'),
            phone:wx.getStorageSync('phone')
          },
          success:(res)=>{
            console.log(res);

          }
        })
        wx.showToast({
          title: '登陆成功',
          duration: 2000,
          icon: 'success',
          mask: true,

        })
        this.returnBack()

    },
    returnBack(){
        wx.navigateTo({
          url: '../myy/myy',
        })
    },




})