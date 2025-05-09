import { model, Schema } from "mongoose";

export interface EventCategories{
    title:string;
    tags:string[];
    expanded:boolean;
}
export const EventCategoriesSchema=new Schema<EventCategories>({
    title:{type:String,required:true},
    tags:{type:[String],required:this},
    expanded:{type:Boolean,default:false}
});

export const EventCategoriesModel=model<EventCategories>("EventCategories",EventCategoriesSchema);