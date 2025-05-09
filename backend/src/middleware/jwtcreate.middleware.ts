
import jwt from "jsonwebtoken";

export const generateOtpTokenResponse=(data:string)=>{
    const token=jwt.sign({
        otp:data
    },process.env.JWT_MAIL_AUTH!,{
        expiresIn:"15m"
    })
    return{
        message:"successfully verification mail sended",
        token:token,
    }
}
export const generateTokenResponse=(user:any)=>{
    const token=jwt.sign({
        id:user.id,email:user.email,name:user.name
    },process.env.JWT_USER_AUTH!,{
       expiresIn:"1000d"
    })

    return {
        id: user.id,
        email: user.email,
        username: user.username,
        name:user.name,
        type: user.type,
        interested:user.interested,
        token: token,
      };
}