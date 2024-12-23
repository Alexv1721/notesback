const {CheckUser,Adduser,checkPassword}=require('../User/user.db')
const AppError=require('../utils/customError')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt');
require('dotenv').config();

const Usersevice={
    loginuser:async(email,pwd)=>{
       try{
        if(email=='' || email==undefined || !/\S+@\S+\.\S+/.test(email)){
            throw new AppError('Invalid Email!')
        }
          if (!pwd) {
            throw new AppError('Password is required')
          } else if (pwd.length < 6) {
            throw new AppError('Password length Must be greater than 6')
          }
        const validemail=await CheckUser(email)
        console.log(validemail);
        
        if(validemail.k){
            const pw=await bcrypt.compare(pwd,validemail.user.password)

            if(!pw){
                throw new AppError('Invalid PassWord')
            }
        const user=validemail.user
  
        const secretKey = process.env.SECRET_KEY

            const token=jwt.sign(email,secretKey)
            console.log(user,'jasjhdsh');
            
            return {user:user,token:token}
        }
else{
    throw new AppError('Invalid Email. Check The Email Address')
}
       }
catch(err){
    console.log(err,'login service');
    
    throw new AppError('Something went Wront!. Please Try Again Later')
}
    }
,signup:async(email,pwd,uname)=>{
if(email=='' || email==undefined || !/\S+@\S+\.\S+/.test(email)){
  throw new AppError('Invalid Email!')
}
if (uname=='') {
  throw new AppError('UserName is required')
} else if (uname.length < 3) {
  throw new AppError('Invalid UserName!')
}
if (pwd=='') {
  throw new AppError('Password is required')
} else if (pwd.length < 6) {
  throw new AppError('Password length Must be greater than 6')
}
try{  
const validemail=await CheckUser(email)
console.log(validemail);

if(!validemail.k){
    const passwd=await bcrypt.hash(pwd,10)
    const user=await Adduser(email,passwd,uname)
    return user
}
else{
console.log('exist');
throw new AppError('User already exist Please Login',400)
}
}
catch(err){
    
throw err
    }
    }
,Validate:async(token)=>{
 try{
const t=jwt.verify(token,process.env.SECRET_KEY || 'hiddenkey')

if(t){

const valid=await CheckUser(t)
if(valid.k){
    return valid
}
else{
    throw AppError('Unotherized Acess')
}
}
else{
    throw AppError('Unotherized Acess')
}
 }
catch(err){
    throw err
}
}

}

module.exports=Usersevice