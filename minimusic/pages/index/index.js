Page({
  data: {
    item: 0,  //swiper组件的current属性的默认值
    tab: 0,   //代表单击相应的标签，添加样式
  playlist:[
    {id:1,title:"错位时空",singer:"艾辰",src:"/audio/错位时空.mp3",coverImgUrl:"/images/ac1.jpeg"},
    {id:2,title:"金玉良缘",singer:"李琦",src:"/audio/金玉良缘.mp3",coverImgUrl:"/images/lq1.jpg"},
    {id:3,title:"山楂树之恋",singer:"程佳佳",src:"/audio/山楂树之恋.mp3",coverImgUrl:"/images/cjj1.jpg"},
    {id:4,title:"消愁",singer:"毛不易",src:"/audio/消愁.mp3",coverImgUrl:"/images/mby1.jpg"},
    {id:5,title:"热爱105度的你",singer:"阿肆",src:"/audio/热爱105度的你.mp3",coverImgUrl:"/images/as1.jpg"},
    {id:6,title:"我的名字",singer:"焦迈奇",src:"/audio/我的名字.mp3",coverImgUrl:"/images/jmq1.jpg"},
    {id:7,title:"爱上了",singer:"胡夏",src:"/audio/爱上了.mp3",coverImgUrl:"/images/hx1.jpg"},
    {id:8,title:"晨昏",singer:"胡夏",src:"/audio/晨昏.mp3",coverImgUrl:"/images/hx2.jpg"},
    {id:9,title:"给我快乐",singer:"胡夏",src:"/audio/给我快乐.mp3",coverImgUrl:"/images/hx3.jpg"},
    {id:10,title:"何为永恒",singer:"胡夏",src:"/audio/何为永恒.mp3",coverImgUrl:"/images/hx4.jpg"},
    {id:11,title:"放下",singer:"胡夏",src:"/audio/放下.mp3",coverImgUrl:"/images/hx5.jpg"},
  ],
  state: 'paused',   //控制播放状态
    playIndex: 0,      //存播放音乐在playlist中的下标
    play: {      //播放音乐的信息
      currentTime: '00:00',
      duration: '00:00',
      percent: 0,
      title: '',
      singer: '',
      coverImgUrl: '',
    }
},
// 滑动页面，标签相应切换
  changeItem:function(e) {
    this.setData({
      item: e.target.dataset.item,
      tab: e.target.dataset.item
    })
  },
  // 标签切换，下面内容相应切换
  changeTab: function(e) {
    this.setData({
      tab: e.detail.current
    })
  },
// 播放功能的实现
  audioCtx:null,
  onReady:function(){
    this.audioCtx = wx.createInnerAudioContext()
    // 默认选择第1曲
    this.setMusic(0)
    var that = this
    // 播放进度检测
    this.audioCtx.onError(function() {
      console.log('播放失败：' + that.audioCtx.src)
    })
    // 播放完成自动换下一曲
    this.audioCtx.onEnded(function() {
      that.next()
    })
     // 自动更新播放进度
     this.audioCtx.onPlay(function() { 
     })
     this.audioCtx.onTimeUpdate(function() {
      // console.log(that.audioCtx.duration)
       that.setData({
         'play.duration': formatTime(that.audioCtx.duration),
         'play.currentTime': formatTime(that.audioCtx.currentTime),
         'play.percent': that.audioCtx.currentTime / that.audioCtx.duration * 100
       })
     })
    // 格式化时间
    function formatTime(time) {
      var minute = Math.floor(time / 60) % 60;
      var second = Math.floor(time) % 60
      return (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second)
    }
    // 在微信小程序使用seek()后，onTimeUpdate监听失效解决方案
    this.audioCtx.onSeeked(() => {
      console.log("onSeeked："+that.audioCtx.paused);
      // that.seek = false;
    })
  },
  // 设置播放音乐信息
  setMusic:function(index){
    var music = this.data.playlist[index]
    this.audioCtx.src = music.src
    this.setData({
      playIndex: index,
      'play.title': music.title,
      'play.singer': music.singer,
      'play.coverImgUrl': music.coverImgUrl,
      'play.currentTime': '00:00',
      'play.duration': '00:00',
      'play.percent': 0
    })
  },
  changePage(e){
    this.setData({
      tab:e.target.dataset.page,
      item:e.target.dataset.page
    })
  },
  // 播放功能
  play(){
    var that=this
    // this.audioCtx.play()
    // 而当拖动进度或者播放完毕后重新播放，
    //都会触发onWaiting，然后onTimeUpdate就挂了.
    //切歌和重新播放音频要想保证onTimeUpdate正常更新,
    //setTimeout(() => {},时间)时间设置够长就不会触发onwaiting解决切换歌曲onTimeUpdate失效问题
    setTimeout(() => {
      that.audioCtx.play()//播放音乐
      }, 500)
    this.setData({
      state:'running'
    })
  },
  // 暂停功能
  pause(){
    this.audioCtx.pause()
    this.setData({
      state:'paused'
    })
  },
  // 下一曲功能
  next:function(){
    var index=this.data.playIndex>=this.data.playlist.length-1?0:this.data.playIndex+1
    this.setMusic(index)
    if(this.data.state==='running')  this.play()
  },
  // 滚动条调节歌曲进度
  sliderChange: function(e) {
    var second = e.detail.value * this.audioCtx.duration / 100
    this.audioCtx.seek(second)
  },
  change(e){
    this.setMusic(e.currentTarget.dataset.index)
    this.play()
 }
})