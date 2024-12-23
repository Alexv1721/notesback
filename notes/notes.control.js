const NotesService=require('../notes/notes.service')
const asyncErrorhandler=require('../utils/asyncError')
const getNotes=asyncErrorhandler(
    async(req,res,next)=>{
    
        
            const notes= await NotesService.getNotes(req.user._id)
            return res.status(200).json({data:notes})
    }      
)

const addNote=asyncErrorhandler(
    async(req,res,next)=>{
            const addednote= await NotesService.AddNotes(req.user._id,req.body)
            return res.status(200).json({data:addednote})
    }    
)
const delNote=asyncErrorhandler(
    async(req,res,next)=>{
            const deldnote= await NotesService.DelNote(req.user._id,req.body.id)
            return res.status(200).json({data:deldnote})
    }    
)
const updateNote=asyncErrorhandler(
    async(req,res,next)=>{
        console.log(req.user._id,req.body.data._id,req.body.data);
            const updatednote= await NotesService.UpdateNote(req.user._id,req.body.data._id,req.body.data)
            return res.status(200).json({data:updatednote})
    }    
)
const getNote=asyncErrorhandler(
    async(req,res,next)=>{
            const note= await NotesService.getNote(req.user._id,req.body.id)
            return res.status(200).json({data:note})
    }      
)


module.exports={getNotes,addNote,delNote,updateNote,getNote}