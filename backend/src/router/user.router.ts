import  express  from "express";
import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import { User, UserModel } from "../models/user.model";
import { STATUS } from "../constant/status";
import nodeMailer from 'nodemailer';
import Mailgen from "mailgen";
import { MailConfig, mailGenerator } from "../config/mail.config";
import { generateOtpTokenResponse, generateTokenResponse } from "../middleware/jwtcreate.middleware";
import { verify } from "jsonwebtoken";
import { verifyUserToken } from "../middleware/mail.middleware";
const route=express()

route.post("/signup",asyncHandler(
    async(req,res)=>{
        const {name,username,password,interested,email,DOB}=req.body;
        const x=await UserModel.findOne({email:email});
        if(x){
          console.log(x)
            res.status(STATUS.BAD_STATUS).send("User is already exists");
            return;
        }
        const user:User={
            name,
            username,
            profile: "",
            DOB: DOB,
            gender: "",
            language: "",
            email,
            password: await bcryptjs.hash(password,10),
            mode: "free",
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
        const result=await UserModel.create(user);
        res.send(generateTokenResponse(result))
    }
))
route.get("/check-username/:uname",asyncHandler(
    async(req,res)=>{
        let username=await UserModel.findOne({username:req.params.uname});
        if(username){
            res.json({allow:true})
            return
        }
        else{
          res.json({allow:false})}
    }
));
route.get("/send-verify/:email",asyncHandler(
    async(req,res)=>{
        let transporter = nodeMailer.createTransport(MailConfig);
        let otpCode="";
        for (let i=0;i<4;i++){
            otpCode=otpCode+Math.floor(Math.random()*9).toString();
        }
        const email={
            body: {
                name: "New user",
                intro: 'Welcome to RI planIt! Use the OTP below to verify your account.',
                table: {
                  data: [
                    {
                      'Your One-Time Password (OTP)': `**${otpCode}**`
                    }
                  ],
                  columns: {
                    customWidth: {
                      'Your One-Time Password (OTP)': '100%'
                    },
                    customAlignment: {
                      'Your One-Time Password (OTP)': 'center'
                    }
                  }
                },
                outro: 'If you did not request this code, please ignore this email or contact our support team immediately.',
                signature: 'Thanks, the RI PlanIt Team'
        }}
        const mail=mailGenerator.generate(email);
        let message={
            from: '"RI planIt " <riplanit@gmail.com>',
            to:'<'+ req.params.email+'>', 
            subject: "Verification code",
            html: mail,
          }
          transporter.sendMail(message).then(()=>{

            res.status(200).send(generateOtpTokenResponse(otpCode));
            return;
          }).catch(error=>{
            res.status(STATUS.BAD_STATUS).send(error);
          })
    }
))

route.post("/verify",asyncHandler(
    async(req,res)=>{
        const{token,otp}=req.body;
       const mailOtp= verifyUserToken(token);
       if(mailOtp.otp==otp){
        res.json({message:"OTP verified successfully"})
       }else{
        res.status(STATUS.BAD_STATUS).send("Invalid otp")
       } 
    }
))


export default route;