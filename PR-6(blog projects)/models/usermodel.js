const mongoose=require('mongoose')

const Userschema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        require:true
    },
   
})

 const user= mongoose.model('user',Userschema)

 module.exports=user;