import {Schema,model} from "mongoose";
import { EVENTSTATUS } from "../constant/event_status";
export interface Events{
    name:string;
    categories:string;
    image:string[];
    description:string;
    date:string;
    time:string;
    location:string;
    location_link:string;
    mode:string;
    price:number;
    limit:number;
    tag:string[];
    lastDate:string;
    host:string[];
    participate:string[];
    language:string;
    status:string;
}

export const EventSchema=new Schema<Events>({
    name:{type:String,required:true},
    categories:{type:String,required:true},
    image:{type:[String],required:true},
    description:{type:String,required:true},
    date:{type:String,required:true},
    time:{type:String,required:true},
    location:{type:String,required:true},
    location_link:{type:String},
    mode:{type:String,default:"offline"},
    price:{type:Number,required:true},
    limit:{type:Number,required:true},
    tag:{type:[String],required:true},
    lastDate:{type:String,required:true},
    host:{type:[String],required:true},
    participate:{type:[String],required:true},
    language:{type:String,required:true},
    status:{type:String,default:EVENTSTATUS.NEW}
},
{
  toJSON:{
      virtuals:true
  },
  toObject:{
      virtuals:true
  },
  timestamps:true

})
export const eventModel=model<Events>("Event",EventSchema);
  