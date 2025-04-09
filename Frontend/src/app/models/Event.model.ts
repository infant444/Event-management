export class Event{
  id!:string;
  name!:string;
  categories!:string;
  image!:string;
  description!:string;
  date!:string;
  time!:string;
  location!:string;
  mode!:string;
  price!:number;
  limit!:number;
  tag?:string[];
  lastDate!:string;
  host?:string[];
  participate?:string[];
  language!:string;
}
