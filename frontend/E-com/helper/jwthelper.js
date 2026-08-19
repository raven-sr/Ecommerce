const sendToken=(user,statuscode,res)=>{
     const token= user.getJWTToken()
     const props={
         expires: new Date(Date.now()+ process.env.COOKIE_EXPIRE_DATE * 24 * 60 * 60 * 1000),
         httpOnly:true,
         secure: true,
         sameSite: "none"
     }
  return res.status(statuscode).cookie("token",token,props).json({
        sucess:true,
        user,
        token,
    });
}

export default sendToken