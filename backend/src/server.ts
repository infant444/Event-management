import dorenv from 'dotenv';
dorenv.config();
import express from 'express';
import cors from 'cors';
import { cloudinaryconnect, dbconnect } from './config/database.config';
import { v2 as cloudinary } from 'cloudinary';
import Eventrouter from "./router/event.router";
dbconnect();
cloudinaryconnect();
const app=express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.get("/upload",async(req,res)=>{

    const uploadResult = await cloudinary.uploader
    .upload(
        'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
            public_id: 'shoes',
        }
    )
    .catch((error) => {
        console.log(error);
    });
 
 console.log(uploadResult);
 res.status(200).json({"mas":"successfully"})
});
app.use("/api/event",Eventrouter);
const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("Websit serve on http://localhost:"+port);
    
})