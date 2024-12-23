const mongoose=require('mongoose')
const notesSchema=new mongoose.Schema({
    head:String,
    date:Date,
    content:String,
    user:{type:mongoose.Schema.ObjectId,ref:'user'}
})
module.exports=mongoose.model('Notes',notesSchema)