const Usersevice=require('../User/user.service')
const asyncErrorhandler=require('../utils/asyncError')

const signUp=asyncErrorhandler(
    async(req,res,next)=>{
        const response=await Usersevice.signup(req.body.email,req.body.password,req.body.username)
        return res.status(200).json({data:response})
    }
)
const login=asyncErrorhandler(
    async(req,res,next)=>{
        const response=await Usersevice.loginuser(req.body.email,req.body.password)
        return res.status(200).json({data:response})
}
)

const tokenValidation=asyncErrorhandler(
    async(req,res,next)=>{

        const response=await Usersevice.Validate(req.headers['authorization'])
        return res.status(200).json({data:response})
}
)

module.exports={signUp,login,tokenValidation}