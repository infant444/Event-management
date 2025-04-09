import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup, FormBuilder, Validators,} from '@angular/forms';
import { Lan } from '../../../models/data/lan';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../Services/event/event.service';

@Component({
  selector: 'app-add-event',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent implements OnInit {
  constructor( private formBuilder:FormBuilder,
    private eventServices:EventService
  ){}
  event!:FormGroup;
  isSubmitted=false;
  imagePreview:any;
  lan=Lan;
  selectedFiles:File[]=[]
  datex=new Date().toISOString().split('T')[0];;
  ngOnInit(): void {
    // console.log(this.lan)
    this.event=this.formBuilder.group({
      name:["",Validators.required],
      Image:["",Validators.required],
      categories:["",Validators.required],
      description:["",Validators.required],
      date:["",Validators.required],
      time:["",Validators.required],
      location:["",Validators.required],
      location_link:[''],
      mode:['offline',Validators.required],
      price:[0],
      limit:[0,Validators.required],
      tag:["",Validators.required],
      lastDate:["",Validators.required],
      host:["",Validators.required],
      language:["",Validators.required]
    })
  }
  get Fc(){
    return this.event.controls;
    }

    onFileSelected(event: any) {
      this.selectedFiles = Array.from(event.target.files);
      console.log(this.selectedFiles)
      const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
      };

      reader.readAsDataURL(file);
    }

    }
  submit(){
    this.isSubmitted=true;
    const fv=this.event.value;
    const tags=fv.tag.split(",");
    const host=fv.host.split(",");
    // console.log(fv)
    if(this.event.invalid && fv.categories!='category'){
      console.log("invalid")
      return;
    }
    const formData=new FormData();

    // console.log(fv.date);
    // console.log(fv.time);

    this.selectedFiles.map((file,index)=>{
      formData.append("files",file,file.name)});
    formData.append("name",fv.name);
    formData.append("description",fv.description);
    formData.append("categories",fv.categories);
    formData.append("date",fv.date);
    formData.append("time",fv.time);
    formData.append("location",fv.location);
    formData.append("location_link",fv.location_link);
    formData.append("mode",fv.mode);
    formData.append("price",fv.price);
    formData.append("limit",fv.limit);
    formData.append("tag",tags);
    formData.append("lastDate",fv.lastDate);
    formData.append("host",host);
    formData.append("language",fv.language);
    this.eventServices.AddEvent(formData).subscribe((x)=>{
      console.log(x);
    })
  }
}
