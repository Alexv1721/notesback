const express=require('express')
const Router=express.Router()
const {getNotes,addNote,delNote,updateNote,getNote}=require('../notes/notes.control')

const verifyUser = require('../middlewares/VerifyUser')
Router.get('/notes',verifyUser,getNotes)
Router.post('/note',verifyUser,getNote)
Router.post('/addnote',verifyUser,addNote)
Router.delete('/deletenote',verifyUser,delNote)
Router.patch('/updatenote',verifyUser,updateNote)
module.exports=Router

