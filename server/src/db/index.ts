import mongoose from "mongoose"

// schemas

const userSchema = new mongoose.Schema({
    userName:String , 
    email:String , 
    password:String , 
    todos : [{type: mongoose.Schema.Types.ObjectId , ref:'todo'}]
})


const todoSchema = new mongoose.Schema({
    title: String , 
    description : String , 
    status : String , 
    Priority : String , 
    deadline : Date
})

export const User = mongoose.model('User' , userSchema) ; 
export const  Todo = mongoose.model('Todo' , todoSchema) ;



