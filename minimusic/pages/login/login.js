// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:""
  },
  //点击登录后触发的方法
  userLogin(e){
    //首先，要拿到账号密码
    console.log(this.data.username);
    console.log(this.data.password);
    var data = {
      username:this.data.username,
      password:this.data.password
    }
    //下面我们就要发请求了，发送请求给服务器
    //我们请求的地址是http://loaclhost:3000/login
    wx.request({
      url: 'http://localhost:3000/login',
      method:"GET",
      data:data,
      success:function(result){
        if(result.data.code == 1){
          wx.showModal({
            title:result.data.msg
          })
          console.log(result)
          //在全局变量中定义一个变量key, 用于断定有没有登录
          //再放一个nickname
          getApp().globalData.key=true;
          getApp().globalData.nickname=result.data.data[0].nickname;
          wx.switchTab({
            url: '../myself/myself',
          })
        }else{
          wx.showModal({
            title:result.data.msg
          })
        }
      },
      fail:function(error){
        console.log(error);
      }
    })
  },
  syncUsername(e){
    //在微信小程序中如果想更新data,中的数据，不能直接赋值，而需要使用状态机
    this.setData({
      username:e.detail.value
    })
    
  },
  syncPassword(e){
    this.setData({
      password:e.detail.value
    })

  },
  register(){
    wx.navigateTo({
      url: '../register/register',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
  
})