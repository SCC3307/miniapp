const express = require("express");
const router = express.Router();
const sql = require("../mysql/index");

//配置user下的二级路由

//1，获取用户列表请求
router.get("/",function(req,res){
    //sql.userList(req,res)
})
//2，添加用户信息
router.get("/add",function(req,res){
    var data=req.query;
    sql.userAdd(req,res,data);
})
router.get("/edit",function(req,res){
    res.send("这是修改用户请求")
})
router.get("/delete",function(req,res){
    res.send("这是删除用户请求")
})
//这里的"/" 相当于http://localhost:3000/user/

//导出
module.exports = router;