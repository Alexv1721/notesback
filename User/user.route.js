const express=require('express')
const Router=express.Router()
const {signUp,login,tokenValidation}=require('../User/user.control')
Router.post('/signup',signUp)
Router.post('/login',login)
Router.get('/validation',tokenValidation)

module.exports=Router
