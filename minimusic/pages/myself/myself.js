// pages/myself/myself.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:"",
    isLogin:false
  },
  login(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  logout(){
    this.setData({
      nickname:"用户名",
      isLogin:false
    })
    //除了改变当前页面上的数据还需要改变全局变量中的数据
    getApp().globalData.nickname = "用户名",
    getApp().globalData.key = false
  },
  decide(){
    if(getApp().globalData.key == true){
      this.setData({
        nickname:getApp().globalData.nickname,
        isLogin:true
      })
    }else{
      this.setData({
        nickname:"用户名",
        isLogin:false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.decide();
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
    this.decide();
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