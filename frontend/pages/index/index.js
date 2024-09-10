Page({
    data:{
        images:[],
        photoPath:'',

    },


    camera:function(){

        wx.chooseImage({
            count:1,
            sizeType:['original','compressed'],
            sourceType:['album','camera'],
            header: {
                'Content-Type': 'multipart/form-data' // 设置请求的 Content-Type
              },
            success (res) {
                  let tempFilePaths = res.tempFilePaths
                //    传给ml
                    wx.uploadFile({
                        url: 'http://113.54.234.48:8000/predict',
                        filePath:tempFilePaths[0],
                        name:'file',
                        formData:{
                            'file':'../../assets/images/renshen.png'
                        },
                        success:(res)=>{
                            let resData = res.data
                            let str = JSON.parse(resData)
                            wx.setStorageSync('prediction', str.prediction)

                        }
                    })
                    console.log(JSON.stringify(tempFilePaths[0]));
                // wx.request({
                //   url: 'http://47.120.67.220:8000/predict',
                // url:'http://113.54.234.48:8000/predict',
                //   method:'POST',
                //   header:{
                //       'Content-type':'application/json'
                //   },
                //   data:JSON.stringify({
                //       "image_url":tempFilePaths[0]
                //   }),
                //   success(res){
                //       console.log(res);
                //   }
                // })


                //   tempFilePaths = JSON.stringify(tempFilePaths)
                  
                //   tempFilePaths = tempFilePaths.replace('[', '').replace(']', '')
                  wx.setStorageSync('tempFilePaths', tempFilePaths)
                  wx.getFileSystemManager().readFile({
                    filePath:tempFilePaths.join(''),
                    encoding:'base64',
                    success:function(res){
                        var base64Data = res.data
                        wx.setStorageSync('image_url', base64Data)
                    },
                    fail(err){
                        console.log(err);
                    }
                })

            

              wx.navigateTo({
                url: '../prediction/prediction',
              })




              //传给后端
            setTimeout(()=>{

                wx.request({
                    url: 'http://47.120.67.220:8080/weixin/miniapp/herb/search ',
                    method:'POST',
                    data:{
                        userId:wx.getStorageSync('openid'),
                        image:wx.getStorageSync('image_url'),
                        name:wx.getStorageSync('prediction')
                    },success:(res)=>{
                        console.log(res.data.data)
                        let name = res.data.data.name
                        wx.setStorageSync('name', name)
                        let origin = res.data.data.origin
                        wx.setStorageSync('origin', origin)
                        let appearance = res.data.data.appearance
                        wx.setStorageSync('appearance', appearance)
                        let func = res.data.data.function
                        wx.setStorageSync('func', func)
                    }
                  })
            
            },500)




              
            },
            fail(err){
                console.log(err);
                wx.showToast({
                  title: '请选择图像',
                  icon:'error'
                })
            }
          })







    }
        





  

})







  