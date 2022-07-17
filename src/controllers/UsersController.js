const UsersModel = require('../models/UsersModel');
const jwt = require('jsonwebtoken');
// Registration

exports.Registration=(req,res)=>{
let reqBody=req.body;
UsersModel.create(reqBody,(err,data)=>{
    if(err){
        res.status(400).json({status:"Fail",data:err});
    }else{
        res.status(200).json({status:"Success",data:data})
    }

})
}

exports.login=(req,res)=>{
    let reqBody=req.body;
    UsersModel.aggregate([
        {$match:reqBody},
        {$project:{_id:0,email:1,firstName:1,lastName:1,mobile:1,photo:1}}
    ],(err,data)=>{
        if(err){
            res.status(400).json({status:"Fail",data:err})
        }else if(data.length > 0){
            let payload={exp:Math.floor(Date.now()/1000)+(24*60*60),data:data[0]['email']}
            let token =jwt.sign(payload,process.env.Secret_Key)
            res.status(200).json({status:"Success",token:token,data:data[0]})
        }else{
            res.status(401).json({status:"UnAuthorized"})
        }
    })
}

exports.profileUpdate=(req,res)=>{
    let email=req.headers['email'];
    let reqBody=req.body;
    UsersModel.updateOne({email:email},reqBody,(err,data)=>{
        if(err){
            res.status(400).json({status:"Fail",data:err})
        }else{
            res.status(200).json({status:"Success",data:data})
        }
    })
}
