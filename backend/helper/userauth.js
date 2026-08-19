import errorHandler from "./helper.js";
import jwt from  "jsonwebtoken";
import User from "../models/userdb.js";


//userAuthentication

export const verifyUser =async (req,res,next)=>{
    try{
         const {token} = req.cookies;
    if(!token){
       return next(new errorHandler("Access Denied Please logIn",401));
    }
    const decodeData=jwt.verify(token,process.env.JWT_SECRET_KEY);
    //we added the key => user:{to store the user deatils}
    req.user= await User.findById(decodeData.id)

    if(!req.user){
        return next(new errorHandler("User not found.", 404));
    }
    next();
    } catch(err){
          if (err.name === "TokenExpiredError") {
        return next(new errorHandler("Token expired", 401));
    }

    if (err.name === "JsonWebTokenError") {
        return next(new errorHandler("Invalid token", 401));
    }

    return next(err);// Pass any other unexpected error
    
    }
   
};


//userAuthorization

export const rolebasedAcc=(...roles)=>{

    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){

             return next(new errorHandler(`Role-${req.user.role} is not allowed to access this resource`, 403));

        }
        next();
    }

}
