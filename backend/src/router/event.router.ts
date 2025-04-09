import express from "express";
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import asynhandler from 'express-async-handler';
import streamifier from 'streamifier';
import { eventModel, Events } from "../models/event.model";
const route = express();
const s = multer.memoryStorage();
const upload = multer({
  storage: s,
  limits: { fieldSize: 1024 * 1024 }
});


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
              language
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
          language
        }
        const y = await eventModel.create(x);
        res.send(y);
      }

    } catch (e) {
      res.status(505).send(e);

    }
  }
));

route.get("/listAll",asynhandler(
  async(req,res)=>{
    const event=await eventModel.find();
    res.send(event);
  }
))

export default route;