const mongoose=require('mongoose');

const contactSchema=mongoose.Schema({

    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"user",
    },

    name:{
        type:String,
        required:[true,'pls add the name']
    },
    email:{
        type:String,
        required:[true,'pls add the conntact email address']
    },
    phone:{
        type:String,
        required:[true,'pls add the conntact phone number']
    },
},
{
    timestamps:true,

})

module.exports= mongoose.model('Contact',contactSchema);


