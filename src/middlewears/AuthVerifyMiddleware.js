const jwt = require('jsonwebtoken');
exports.AuthVerifyMiddleware =(req,res,next)=>{
    let Token=req.headers['token'];
    jwt.verify(Token,process.env.Secret_Key,(err,decoded)=>{
        if(err){
            console.log(Token);
            res.status(401).json({status:"UnAuthorized"})
        }else{
            let email=decoded['data'];
            console.log(email);
            req.headers.email=email;
            next();
        }

    })


}