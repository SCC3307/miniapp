const express = require("express");
var app = new express;
//引入二级路由模块
var user = require("./router/user");
var friend = require("./router/friend");
//引入数据库方法
var sql = require("./mysql/index");


//登录请求  一级路由
app.get("/login",function(req,res){
    //登录请求的逻辑
    //1,拿到用户输入的用户名和密码的时候，我们需要将用户名去数据库中查找
    //2，如果查到结果，说明我们账号存在，那么判断密码是否正确，如果正确，表示登录成功
    //3,如果没有查到结果，说明我们的账号不存在，那么直接返回登录失败
    
    //之前说过req 是请求对象
    //get请求的参数在req中的query
    console.log(req.query)
    var data = req.query;
    sql.userSelect(req,res,data)
})
//退出请求
app.get("/logout",function(req,res){
    res.send("这是退出请求");
})

//注册请求


//friend的获取

//请求过多不能都写到service.js中，要用路由管理工具 Router

//1，用户模块（二级路由）
app.use("/user",user);
//这里表示 如果访问到/user了，我们就交给二级路由user模块处理


//2,friend模块
app.use("/friend",friend);


app.listen(3000,function(){
    console.log("服务器跑起来了")
})