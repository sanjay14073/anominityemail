const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    "uuid":{
        type:String,
        required:true,
    },
    "previous_complaints":[{
        type:String,
        required:true,
    }]
})
const User=mongoose.model("User",userSchema);

module.exports=User;