const notesModel = require('../notes/notes.model')
const Notesmodel=require('../notes/notes.model')
const AppError=require('../utils/customError')
const getNotesFromDB=async(uid)=>{
  try{

    const notes=await Notesmodel.find({user:uid})
    return notes
  }
  catch(err){
    console.log(err);
    throw new AppError('Some Thing Went Wrong!. Try Again Later')
  }
}
const addNotesToDB=async(uid,note)=>{
  try{
    const today = new Date();
    const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
const k={
      head: note.head,
      date: date,
              content: note.content,
              user:uid
    }
  const newnote=await Notesmodel.create(k)
if(Object.keys(newnote).length==0){
  throw new AppError('Note was not added. Try again Later.')
}
  return newnote
  }
catch(err){
  console.log(err);
  throw new AppError('Some Thing Went Wrong!. Try Again Later')
}
}
const  DeleteNoteFromDB=async(uid,nid)=>{
try{
  const t=await notesModel.findOne({_id:nid,user:uid})
 
  
  const deletedNote=await notesModel.deleteOne({_id:nid,user:uid})  
  if(Object.keys(deletedNote).length==0){
    throw new AppError('Some Thing Went Wrong!.Try Again Later')
  }
  return deletedNote
}
catch(err){
  console.log(err);
  throw new AppError('Some Thing Went Wrong!.Try Again Later')
}
}

const UpdateNoteToDB=async(uid,nid,data)=>{
  const today = new Date();
const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const k={
    head: data.head,
    date:date,
            content: data.content 
  }
  try{
const unote=await Notesmodel.findOneAndUpdate({_id:nid,user:uid},{$set:k},{new:true} )
return unote
  }
  catch(err){
    console.log(err);
    throw new AppError('Some Thing Went Wrong!.Try Again Later')
  }
}
const GetANoteFromDB=async(uid,nid)=>{
try{

  const note =await Notesmodel.findOne({_id:nid,user:uid})
return note
}
catch(err){
  console.log(err);
  throw new AppError('Some Thing Went Wrong!.Try Again Later')
}
}
module.exports={getNotesFromDB,addNotesToDB,DeleteNoteFromDB,UpdateNoteToDB,GetANoteFromDB}