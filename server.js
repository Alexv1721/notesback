const express=require('express')
const app=new express()
require('dotenv').config();
console.log(process.env.SECRET_KEY); // Should log 'mysecretkey'
const mongoose = require('mongoose')
const cors = require("cors");
const Notesmodel=require('../backend/notes/notes.model')
const NotesRoutes=require('./notes/notes.route')
const UserRoutes=require('../backend/User/user.route');
const notesModel = require('../backend/notes/notes.model');
const GlobalError=require('../backend/utils/GlobalError')
//middleware
app.use(express.urlencoded({extended: true})) //to allow he forms data
app.use(cors()); //to allow the request and response
app.use(express.json()) // to parse the json to js object
mongoose.connect('mongodb://0.0.0.0:27017/notesapp')

// notesModel.create({head:'workout',content:
// 'asdsdf',date:'12-04-22'
// })

app.use('/notes',NotesRoutes)
app.use('/users',UserRoutes)
app.use(GlobalError)
app.listen(process.env.PORT||5000, () => console.log('server running'))

