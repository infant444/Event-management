
import{connect, ConnectOptions} from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

export const dbconnect=()=>{
    connect(process.env.MONGODB_URL!,{

    } as ConnectOptions).then(
        ()=>console.log("connect successfully"),
        (error)=>console.log(error)
    )
}
export const cloudinaryconnect=()=>{
        cloudinary.config({ 
            cloud_name: process.env.CLOUD_NAME!, 
            api_key: process.env.CLOUD_APIKEY!, 
            api_secret: process.env.CLOUD_API_SECRATEKEY! 
        });
}