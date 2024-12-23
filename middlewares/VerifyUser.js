const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const AppError = require('../utils/customError');
const userModel = require('../User/user.model');
const { CheckUser } = require('../User/user.db');
const verifyUser=async(req,res,next)=>{
const token=req.headers['authorization']
if(token=='' || token==undefined){
    return res.status(400).json({err:'No Token Provided'})
}
try{
    const v=jwt.verify(token,process.env.SECRET_KEY)
    const user=await CheckUser(v)
    if(!user.k){
        return res.status(400).json({err:'Unotharized Acess'})
    }
    req.user=user.user
   
    next()
}
catch(err){
    return res.status(400).json({err:'Unotharized Acess'})
}


}

module.exports=verifyUser