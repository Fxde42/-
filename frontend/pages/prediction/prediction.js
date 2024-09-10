// pages/prediction/prediction.js
Page({
    data:{
        image_url:'',
        origin:'',
        appearance:'',
        func:'',
        name:'',
    },
    onShow(){
        setTimeout(()=>{

            this.setData({
                origin:wx.getStorageSync('origin'),
                appearance:wx.getStorageSync('appearance'),
                name:wx.getStorageSync('name'),
                func:wx.getStorageSync('func'),
                image_url:wx.getStorageSync('image_url')
            })
        },600)

    }
})