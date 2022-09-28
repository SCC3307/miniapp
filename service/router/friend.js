const express = require("express");
const router = express.Router();

router.get("/",function(req,res){
    res.send("这是friend列表");
})

module.exports = router