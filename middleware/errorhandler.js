const {constant}=require('../constants');

const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode?res.statusCode:400;
    switch (statusCode) {
        case constant.VALDITATION_ERR:
            res.json({title:"validation error",
            message:"err.message",
            stackTrace :"err.stack",});
            
            break;
        
        case constant.NOT_FOUND:
            res.json({title:"not found",
            message:"err.message",
            stackTrace :"err.stack"});
            break;
        
        case constant.UNAUTHORISED:
                res.json({title:"unauthorised",
                message:"err.message",
                stackTrace :"err.stack"});
                break;

         case constant.FORBIDDEN:
               res.json({title:"forbidden",
               message:"err.message",
                stackTrace :"err.stack"});
                break;

         case constant.SERVER_ERR:
                    res.json({title:"server error",
                    message:"err.message",
                     stackTrace :"err.stack"});
                     break;
            
        default:
            console.log("No error all good!");
            break;
    }
    res.json({message:"err.message"})

}
module.exports=errorHandler;