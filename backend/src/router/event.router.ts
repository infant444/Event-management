import express from "express";
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import asynhandler from 'express-async-handler';
import { eventModel, Events } from "../models/event.model";
import { STATUS } from "../constant/status";
import { EVENTSTATUS } from "../constant/event_status";
import { EventCategoriesModel } from "../models/eventCategories.model";
import { EventCategoriesSample } from "../data/EventCategories";
const route = express();
const s = multer.memoryStorage();
const upload = multer({
  storage: s,
  limits: { fieldSize: 1024 * 1024 }
});
// User event
route.get("/listAll",asynhandler(
  async(req,res)=>{
    const event=await eventModel.find({status:EVENTSTATUS.NEW}).sort({ createAt: -1 });;
    res.send(event);
  }
))



route.get('/update',asynhandler(
async(req,res)=>{
  try{
    const events= await eventModel.find({ status: { $ne: 'expired' } });
    const now = new Date();
    for(const event of events){
      const eventDate = new Date(event.date); 
      const LastDate = new Date(event.lastDate); 
      let newStatus=EVENTSTATUS.NEW;
      if(LastDate<now){
        newStatus=EVENTSTATUS.REGISTERCLOSE;
        if(eventDate==now){
        newStatus=EVENTSTATUS.GOINGON;

        }
        else if(eventDate<now){
          newStatus=EVENTSTATUS.COMPLETED;
        }
      }

      if (event.status !== newStatus) {
        event.status = newStatus;
        await event.save();
        console.log(`Updated "${event.name}" to ${newStatus}`);
      }

    }
    res.json({"message":"successfully updated"})

  }catch(e){
    res.status(STATUS.BAD_STATUS).json({"message":e});
  }
}
))

// organizer side event handling

route.post("/addevent", upload.array("files"), asynhandler(
  async (req, res) => {
    try {
      const imgs = req.files as Express.Multer.File[];

      const { name, categories, image, description, date, time, location, location_link, mode, price, limit, tag, lastDate, host, participate, language } = req.body;
      let img: string[] = [];
      let len = imgs.length;
      let i = 0;
      if (len > 0) {
        imgs.map(async (files) => {
          const base64Data = `data:${files.mimetype};base64,${files.buffer.toString('base64')}`;
          const result = await cloudinary.uploader.upload(base64Data, {
            folder: 'Events', // optional
            public_id: files.originalname.split('.')[0],
            resource_type: 'image',
          });
          img.push(result.secure_url);
          i++;
          if (i == len) {
            const x: Events = {
              name,
              categories,
              image: img,
              description,
              date,
              time,
              location,
              location_link,
              mode,
              price,
              limit,
              tag,
              lastDate,
              host,
              participate,
              language,
              status: EVENTSTATUS.NEW
            }
            const y = await eventModel.create(x);
            res.send(y);
          }
        });
      } else {
        const x: Events = {
          name,
          categories,
          image: img,
          description,
          date,
          time,
          location,
          location_link,
          mode,
          price,
          limit,
          tag,
          lastDate,
          host,
          participate,
          language,
          status: EVENTSTATUS.NEW
        }
        const y = await eventModel.create(x);
        res.send(y);
      }

    } catch (e) {
      res.status(505).send(e);

    }
  }
));


// Event Categories
route.get("/event-categories/seed",asynhandler(
  async(req,res)=>{
    const EventCategoriesCount = await EventCategoriesModel.countDocuments();
    if (EventCategoriesCount > 0) {
        res.send("Seed is already done");
        return;
    }
    await EventCategoriesModel.create(EventCategoriesSample);
    res.send("Seed is Done");
  }
))
route.get("/event-categories/getall",asynhandler(
  async(req,res)=>{
    const categories=await EventCategoriesModel.find();
    res.send(categories)
  }
))
export default route;