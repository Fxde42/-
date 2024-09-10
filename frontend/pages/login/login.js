Page({

   
    data:{
        selectorRange:['男','女'],
        selectorIndex:0,
        phone:'',
        gender:'',
        imgURL:'',
        nickname:'',
        avatarbase:'',
        },
    
        // 选择头像
        chooseAvatar (e) {
            const {avatarUrl} = e.detail
            let imgURL = avatarUrl
            
            this.setData({
                imgURL:imgURL
            })
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
            gender:this.data.selectorRange[e.detail.value]
          });
        console.log('选择的项：',this.data.selectorRange[e.detail.value]);
        wx.setStorageSync('gender', this.data.selectorRange[e.detail.value])
    },

     //存储

     onLoad(options) {
        const phone = wx.getStorageSync('phone')
        const gender = wx.getStorageSync('gender')
        const imgURL = wx.getStorageSync('imgURL')
        const nickname = wx.getStorageSync('nickname')
      this.setData({
          phone:phone,
          gender:gender,
          imgURL:imgURL,
          nickname:nickname
      })
    },



      save(){

        
        const resu1 = wx.getStorageSync('phone')
        const resu2 = wx.getStorageSync('gender')
        const resu3 = wx.getStorageSync('imgURL')
        const resu4 = wx.getStorageSync('nickname')
        this.setData({
            phone:resu1,
            gender:resu2,
            imgURL:resu3,
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
        wx.navigateBack({
            delta:1
          })


    },



    // 退出登录
    async exit(){
        removeStorage('userInfo')
        removeStorage('token')
        removeStorage('gender')
        removeStorage('phone')
        this.setToken('')
        this.setUserInfo('')
        console.log(this);
        this.setData({
            gender:'',
            phone:''
        })

        console.log('已删除');
    }



})