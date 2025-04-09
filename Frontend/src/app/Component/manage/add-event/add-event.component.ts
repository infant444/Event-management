import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup, FormBuilder, Validators,} from '@angular/forms';
import { Lan } from '../../../models/data/lan';

@Component({
  selector: 'app-add-event',
  imports: [ReactiveFormsModule],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent implements OnInit {
  constructor( private formBuilder:FormBuilder){}
  event!:FormGroup;
  isSubmitted=false;
    lan=[
    { code: "hi", name: "Hindi" },
    { code: "en", name: "English" },
    { code: "ta", name: "Tamil" },
    { code: "te", name: "Telugu" },
    { code: "kn", name: "Kannada" },
    { code: "ml", name: "Malayalam" },
    { code: "mr", name: "Marathi" },
    { code: "bn", name: "Bengali" },
    { code: "gu", name: "Gujarati" },
    { code: "pa", name: "Punjabi" },
    { code: "or", name: "Odia" },
    { code: "as", name: "Assamese" },
    { code: "ur", name: "Urdu" },
    { code: "kok", name: "Konkani" },
    { code: "sd", name: "Sindhi" },
    { code: "ne", name: "Nepali" },
    { code: "ks", name: "Kashmiri" },
    { code: "ma", name: "Maithili" },
    { code: "san", name: "Sanskrit" },
    { code: "mni", name: "Manipuri" },
    { code: "doi", name: "Dogri" },
    { code: "bho", name: "Bhojpuri" },
    { code: "raj", name: "Rajasthani" },
    { code: "ch", name: "Chhattisgarhi" },
    { code: "ho", name: "Ho" },
    { code: "sat", name: "Santali" },
    { code: "gon", name: "Gondi" },
    { code: "lep", name: "Lepcha" },
    { code: "bh", name: "Bhil" }
  ];
  selectedFiles:File[]=[]

  ngOnInit(): void {
    console.log(this.lan)
    this.event=this.formBuilder.group({
      name:["",Validators.required],
      Image:["",Validators.required],
      categories:["category",Validators.required],
      description:["",Validators.required],
      date:["",Validators.required],
      time:["",Validators.required],
      location:["",Validators.required],
      location_link:[''],
      mode:['offline',Validators.required],
      price:[0,Validators.required],
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
    }
  submit(){
    this.isSubmitted=true;
    if(this.event.invalid){
      console.log("invalid")
      return;
    }
    const formData=new FormData();

    this.selectedFiles.map((file,index)=>{
      formData.append("files",file,file.name)});
  }
}
