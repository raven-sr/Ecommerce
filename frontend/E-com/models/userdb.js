import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from  "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      lowercase: true,
      trim: true,
      validate:[validator.isEmail,"please enter valid email"]
    },

    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: 6,
      select: false, // Don't return password by default
    },

    avatar: {
      public_id: {
        type: String,
        required:true
      },
      url: {
        type: String,
        required:true
      },
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    address:{
      type: String,
      trim: true
    },
     city: {
        type: String,
        trim: true        
      },
      state: {
        type: String,
        trim: true
      },
      country: {
        type: String,
        trim: true
      },
      pinCode: {
        type: Number
      },
      phoneNo: {
        type: Number
      },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save",async function (){

    if(!this.isModified("password")){
       return ;
    }
    this.password= await bcrypt.hash(this.password,10);
   
})
userSchema.methods.getJWTToken= function (){

  return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRE_DATE})
}
userSchema.methods.verifyPass=async function (userPass){
 return await bcrypt.compare(userPass,this.password)
}

userSchema.methods.resetPassToken= function (){
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken= crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire=new Date(Date.now() + 30 * 60 * 1000);
  return resetToken;
}

export default mongoose.model("User", userSchema);
