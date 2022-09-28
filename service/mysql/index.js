//这里我们需要连接数据库 并且 写好方法
//连接数据库 需要借助第三方模块
var mysql = require("mysql");
//创建连接
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"hekeda"
})

//连接
connection.connect();

//查找单一用户的方法
function userSelect(req,res,data){
    var sqls = "select * from user where username = ?";
    connection.query(sqls,data.username,function(error,result){
        if(error) throw error;
        //走到这里说明用户存在，那么我们要判断密码
        if(result.length == 0){
            //走到这里说明我们数据库中没有查到数据，所以我们这里表示账号不存在
            res.send({
                status:200,
                code:0,
                msg:"账号不存在"
            })
        }else{
            //走到这里说明账号存在我们需要继续判断密码是否正确
            if(data.password == result[0].password){
                //进来的话表示密码正确
                res.send({
                    status:200,
                    code:1,
                    msg:"登录成功",
                    data:result
                })
            }else{
                res.send({
                    status:200,
                    code:0,
                    msg:"密码错误"
                })
            }
        }
        
    }) 
}






//一、用户模块的方法
//1,获取用户列表
function userList(req,res){
    //console.log(res);
    //查询数据库
    //query 第一个参数写语句，，后面的参数写方法
    //这里的回调函数有两个参数，第一个参数就是错误，第二个参数就是错误，就是数据库查到的结果
    connection.query('select * from user',function(error,result){
        if(error) throw error;
        console.log(result)
        //res.send(result)
    })
}
//2,添加用户信息
function userAdd(req,res,data){
    connection.query("insert into user(username,password,nickname) values (?,?,?)",[data.username,data.password,data.nickname],function(error,result){
        if(error) throw error;
        //走到这里说明插入成功了
        res.send(
            {
                status:200,
                code:1,
                msg:"添加成功"
            }
        )
    });
}
//3,修改用户请求
function userEdit(req,res,data){
    connection.query("update user set password = ?,nickname = ? where username = ?",[data.password,data.nickname,data.username],function(error,result){
        if(error) throw error;
        //走到这里说明修改成功了
        res.send(
            {
                status:200,
                code:1,
                msg:"修改成功"
            }
        )
    });
}
//4,删除用户请求
function userDelete(req,res,data){
    var sqls = "delete from user where username = ?";
    connection.query(sqls,data.username,function(error,result){
        if(error) throw error;
        res.send({
            status:200,
            code:1,
            msg:"删除用户成功"
        })
    })
}







//userList();
module.exports={
    userList,
    userAdd,
    userEdit,
    userDelete,
    userSelect
}