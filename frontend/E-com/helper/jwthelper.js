const sendToken=(user,statuscode,res)=>{
     const token= user.getJWTToken()
     const props={
         secure: true,
         sameSite: "none",
         expires: new Date(Date.now()+ process.env.COOKIE_EXPIRE_DATE * 24 * 60 * 60 * 1000),
         httpOnly:true
     }
  return res.status(statuscode).cookie("token",token,props).json({
        sucess:true,
        user,
        token,
    });
}

export default sendToken