import  express  from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { User, UserModel } from "../models/user.model";
import { STATUS } from "../constant/status";
const route=express()

route.post("/signup",asyncHandler(
    async(req,res)=>{
        const {name,username,password,interested,email}=req.body;
        const x=await UserModel.find({email:email});
        if(x){
            res.status(STATUS.BAD_STATUS).json({message:"User is already exists"})
        }
        const user:User={
            name,
            username,
            profile: "",
            DOB: "",
            gender: "",
            language: "",
            email,
            password: (await bcryptjs.hash(password,10)),
            mode: "",
            mobile: "",
            insta: "",
            facebook: "",
            linkedin: "",
            type: "user",
            subscription: false,
            subscription_End: "",
            interested,
            credit: 15
        }
        const result=await UserModel.create();
        res.send(generateTokenResponse(result))
    }
))
route.get("/check-username/:uname",asyncHandler(
    async(req,res)=>{
        const username=await UserModel.find({username:req.params.uname});
        if(username){
            res.json({allow:false})
        }res.json({allow:true})
    }
));
route.get("/verify",asyncHandler(
    async(req,res)=>{
        
    }
))
const generateTokenResponse=(user:any)=>{
    const token=jwt.sign({
        id:user.id,email:user.email,isAdmin:user.isAdmin
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

export default route;