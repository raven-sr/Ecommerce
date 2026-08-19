import errorHandler from "../helper/helper.js"
import User from "../models/userdb.js"
import sendToken from "../helper/jwthelper.js";
import { sendEmail } from "../helper/sendmail.js";
import crypto from "crypto";
import {v2 as cloudinary} from "cloudinary"

//Registration

// export const registerUser =async (req,res)=>{
//  const user = await User.create(req.body);

//  sendToken(user,201,res);

// }


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter name, email and password"
            });
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an avatar"
            });
        }
        // Upload image buffer to Cloudinary
        const myCloud = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "avatars"
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            stream.end(req.file.buffer);
        });
        // Create user
        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        });
        sendToken(user, 201, res);
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
//Login

export const logInUser= async (req,res,next)=>{
 
    const {email, password}= req.body;

    if(!email || !password){
      return next (new errorHandler("email or password cannot be empty",400));
    }

    const user=await User.findOne({email}).select("+password");
    if(!user){
         return next (new errorHandler("Email not found",404));
    }
    const verifyPassword= await user.verifyPass(password)
   if(!verifyPassword){
     return next (new errorHandler("Invalid email or password",400));
   }

   sendToken(user,200,res);

}

// logOut

export const logOut =(req,res)=>{

 const props={
        expires: new Date(Date.now()),
        httpOnly:true
     }

  return res.status(200).cookie("token",null,props).json({
    success:true,
    message:"Successfully logged Out"
  })
}

//resetPassword

export const forgotPassword= async(req,res,next)=>{

  let resetToken;
  let user;

  try{
      const {email} = req.body;
      user =await User.findOne({email});
      if(!user){
        return next (new errorHandler("User not found",404));
      }
      resetToken= user.resetPassToken();
      await user.save({validateBeforeSave:false}); 

       
      }catch(err){

        // return next (new errorHandler("could not save rest token,Try again later",500));
        next(err)

      }
      const resetPasswordUrl = `http://localhost:5173/resetpass/${resetToken}`; 
     const messageHTML = `
<div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:30px;">
  <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; padding:30px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">

    <h2 style="color:#333; text-align:center;">
      Password Reset Request
    </h2>

    <p>Hello <strong>${user.name}</strong>,</p>

    <p>
      We received a request to reset the password for your account.
      Click the button below to create a new password.
    </p>

    <div style="text-align:center; margin:30px 0;">
      <a href="${resetPasswordUrl}"
         style="
           background:#007bff;
           color:#ffffff;
           padding:14px 28px;
           text-decoration:none;
           border-radius:5px;
           font-size:16px;
           display:inline-block;
         ">
        Reset Password
      </a>
    </div>

    <p>
      If the button doesn't work, copy and paste the following link into your browser:
    </p>

    <p style="word-break:break-all;">
      <a href="${resetPasswordUrl}">
        ${resetPasswordUrl}
      </a>
    </p>

    <div style="
      background:#fff3cd;
      color:#856404;
      padding:15px;
      border-radius:5px;
      margin-top:20px;
    ">
      <strong>Note:</strong> This password reset link will expire in
      <strong>30 minutes</strong>.
    </div>

    <p style="margin-top:20px;">
      If you didn't request a password reset, you can safely ignore this email.
      Your password will remain unchanged.
    </p>

    <hr style="margin:30px 0;">

    <p style="color:#777; font-size:14px;">
      Regards,<br>
      <strong>E-Commerce Support Team</strong>
    </p>

  </div>
</div>
`;
 
 try {
   await sendEmail({email:user.email,subject:"password reset req",htmlMessage:messageHTML})
   return res.status(200).json({
    success:true,
    message:"password reset mail has been sent"
   })
 } catch (error) {
  user.resetPasswordToken= undefined,
  user.resetPasswordExpire= undefined,
  await user.save({validateBeforeSave:false})
  return next(new errorHandler( error.message || "email couldn't send try again later",500));
 }

     
}

export const resetPassword= async(req,res,next)=>{
  const resetPasswordToken =  crypto.createHash("sha256").update(req.params.token).digest("hex"); 
 
  const user=await User.findOne({
    resetPasswordToken,
    // resetPasswordExpire:{$gt :Date.now()}
  })
  if(!user){
        return next (new errorHandler("Invalid or user token expired",400));
      } 
  const {Password , confirmPassword  }= req.body;
  if(Password != confirmPassword){

    return next (new errorHandler("Password's Dosen't match",400));
  }
  user.password= Password;
  user.resetPasswordToken= undefined,
  user.resetPasswordExpire= undefined,
  await user.save({validateBeforeSave:false})

   sendToken(user,201,res);
}

//getAllUsers

export const getAllUsers= async (req,res)=>{

  const users= await User.find();

  return res.status(200).json({
    success:true,
    users,
  })
}

//getSingleUser

export const getSingleUser = async (req,res,next)=>{

    const id =  req.params.id

    const user = await User.findById(id)
    if(!user){

        return next(new errorHandler("user not found",404))
        
    }


    return res.status(200).json({message:"Single user",user})
}

// UpdateUser

export const updateUser = async(req,res,next)=>{
    const id = req.params.id

    const {role}= req.body;
   
    let user = await User.findByIdAndUpdate(id,{role},{
        new:true,
        runValidators:true
    })
     if(!user){

        return next(new errorHandler("user not found",404))
    }
    return res.status(200).json({
        message:"user Updated",
        user
    })


}

// Delete user
export const deleteUser = async (req,res,next)=>{
     const id = req.params.id

     let user = await User.findByIdAndDelete(id)

     if(!user){

       return next(new errorHandler("user not found",404))
    }
    return res.status(200).json({
        message:"user Deleted",
        user
    })
    
}

export const userAddress = async (req,res,next)=>{
const user = req.user;


if(!user){

  return next(new errorHandler("User not found",404))
}
const {address,country,state,pinCode,city,phoneNo} = req.body;

if(!address || !country || !state || !pinCode || !city || !phoneNo){

  return next(new errorHandler("please fill all the details",400));
}

  user.address = address;
  user.country = country;
  user.state = state;
  user.pinCode = pinCode;
  user.city = city;
  user.phoneNo = phoneNo;

  await user.save();

  return res.status(200).json({
      success: true,
      address: user.address,
      country: user.country,
      city: user.city,
      state: user.state,
      pinCode: user.pinCode,
      phoneNo: user.phoneNo
  });


}



//Get my data
export const GetMyData = async(req, res, next)=> {
  const user = req.user
  if(!user){
    return next (new errorHandler("Invalid User", 404))
  }
  return res.status(200).json({success: true, user})
}

