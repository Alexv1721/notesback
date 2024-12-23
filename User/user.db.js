const userModel = require('../User/user.model')
const bcrypt=require('bcrypt')
const AppError = require('../utils/customError')

const CheckUser=async(email)=>{
try{
    const user=await userModel.findOne({email:email})
if(user!=null){
    return {k:true,user}
}
return {k:false}
}
catch(err){
    console.log(err);
    throw err

}
}
const Adduser=async(email,password,username)=>{
   try{
    const user=await userModel.create({username:username,email:email,password:password})
    return user
   }
   catch(err){
    console.log(err);
    
    throw new Error('Unexpected Error Please Try Later')

}
}
const checkPassword=async(email,pwd)=>{
    try{
        const user=await userModel.findOne({email:email,password:pwd})
        return {username:user.username,email:user.email}
       }
       catch(err){
        console.log(err);
        throw new AppError('Unexpected Error Please Try Later')
    
    }
}
module.exports={CheckUser,Adduser,checkPassword}