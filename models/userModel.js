const mongoose=require('mongoose');

const userSchema=mongoose.Schema({

username:{
    type:String,
    required:[true,"please provide username"],
},
email:{
    type:String,
    required:[true,"please provide username"],
    unique:[true,'this is already register']
},
password:{
    type:String,
    required:[true,"please enter password"]
},
},{
    timestamps:true,
}

)

module.exports=mongoose.model('User',userSchema);