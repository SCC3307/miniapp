// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:"",
    againPassword:"",
    nickname:""
  },
  changeUsername(e){
    this.setData({
      username:e.detail.value
    })
  },
  changePassword(e){
    this.setData({
      password:e.detail.value
    })
  },
  changeAPassword(e){
    this.setData({
      againPassword:e.detail.value
    })
  },
  changeNickname(e){
    this.setData({
      nickname:e.detail.value
    })
  },
  register(e){
    console.log(this.data.username);
    console.log(this.data.password);
    console.log(this.data.againPassword);
    console.log(this.data.nickname);
    if(this.data.password == this.data.againPassword){
      var data = {
        username:this.data.username,
        password:this.data.password,
        nickname:this.data.nickname
      }
      wx.request({
        url: 'http://localhost:3000/user/add',
        method:"GET",
        data:data,
        success:function(result){
          console.log(result);
          if(result.data.code == 1){
            wx.showModal({
              title:result.data.msg,
              success:function(){
                wx.navigateTo({
                  url: '../login/login',
                })
              }
            })
          }
        }
      })
    }else{
      wx.showModal({
        title:"请保证两次密码相同"
      })
    }
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