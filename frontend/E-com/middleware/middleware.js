import errorHandler from "../helper/helper.js";
export default(err,req,res,next)=>{
    err.statuscode = err.statuscode || 500
    err.message = err.message || "Internal server error"
     
if(err.code===11000){
 const message=`This ${Object.keys(err.keyValue)} is already registered`;
  
 err= new errorHandler(message,400);

}

    res.status(err.statuscode).json({
        success: false,
        message:err.message

    }) 
}