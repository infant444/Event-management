import { Model, Schema,model} from "mongoose";

export interface User{
    name:string;
    username:string;
    profile:string;
    DOB:string;
    gender:string;
    language:string;
    email:string;
    password:string;
    mode:string;
    mobile:string;
    insta:string;
    facebook:string;
    linkedin:string;
    type:string;
    subscription:boolean;
    subscription_End:string;
    interested:string[];
    credit:number;
  }

  export const UserSchema=new Schema<User>({
    name:{type:String,required:true},
    username:{type:String,required:true},
    profile:{type:String},
    DOB:{type:String},
    gender:{type:String},
    language:{type:String},
    email:{type:String,required:true},
    password:{type:String,required:true},
    mode:{type:String},
    mobile:{type:String},
    insta:{type:String},
    facebook:{type:String},
    linkedin:{type:String},
    type:{type:String,default:"user"},
    subscription:{type:Boolean},
    subscription_End:{type:String},
    interested:{type:[String],required:true},
    credit:{type:Number,default:15},
  },{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    },
    timestamps:true
  
  });

  export const UserModel=model<User>("User",UserSchema);

