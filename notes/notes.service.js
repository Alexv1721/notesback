const {getNotesFromDB,addNotesToDB,DeleteNoteFromDB,UpdateNoteToDB,GetANoteFromDB}=require('../notes/notes.db')
const AppError=require('../utils/customError')
const NotesService={
    getNotes:async(uid)=>{
      try{
        const notes=await getNotesFromDB(uid)
        return notes
      }
      catch(err){
        throw new AppError('Some Thing Went Wrong!. Try Again Later')
      }
      
    },
    AddNotes:async(uid,data)=>{
try{

if(data.head=='' || data.head==undefined){
  throw new AppError('Head field is required!')
}
if(data.content=='' || data.content==undefined){
  throw new AppError('Contenet field is required!')
}
const addednote=await addNotesToDB(uid,data)

return addednote
}
catch(err){
  throw new AppError('Some Thing Went Wrong!. Try Again Later')
}
    },
    DelNote:async(uid,nid)=>{
try{
  if(nid=='' || nid==undefined){
    throw new AppError('Cant delete!.Refresh the page or try again later')
  }
  const dnote=await DeleteNoteFromDB(uid,nid)
  return dnote
}
catch(err){
  throw err
}
    },
    UpdateNote:async(uid,nid,data)=>{
      try{
        if(nid=='' || nid==undefined){
          throw new AppError('Cant Update!.Refresh the page or try again later')
        }
        const upnote=await UpdateNoteToDB(uid,nid,data)
        return upnote
      }
      catch(err){
        throw new AppError('Some Thing Went Wrong!. Try Again Later')
      }
    },
    getNote:async(uid,nid)=>{
      try{
        const note=await GetANoteFromDB(uid,nid)
        return note
      }
      catch(err){
        throw err
      }
    }
}

module.exports=NotesService;