import { verify } from "jsonwebtoken";


export const verifyUserToken=(token:string)=>{
    if(!token){
        return;
    }
    try{
        const decoderedUser=verify(token,process.env.JWT_MAIL_AUTH!);
        console.log(decoderedUser);
        const x:any=decoderedUser;
        console.log(x.otp);
        
        return x;

    }
    catch(error){
        console.log(error);
    }
}