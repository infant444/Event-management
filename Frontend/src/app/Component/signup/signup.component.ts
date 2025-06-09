import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { passwordsMatchValidator } from '../../models/validator/confirm_password';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {  Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipGrid, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { EventCategories } from '../../models/eventCategories';
import { EventService } from '../../Services/event/event.service';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,MatIconModule,MatChipsModule,CommonModule,MatFormFieldModule, MatInputModule, MatAutocompleteModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  constructor(private user:UserService,
    private builder:FormBuilder,
    private router:Router,
    private event:EventService,
    private toastrServices:ToastrService
  ){

  }
  firstPage!:FormGroup;
  secondPage!:FormGroup;
  otpForm!: FormGroup;
  passVis=false;
  PassTxt='visibility';
  PassType='password';
  ConPassVis=false;
  ConPassTxt='visibility';
  ConPassType='password';
  page1=true;
  page2=false;
  page3=false;
  page4=false;
  firstIsSubmitted=false;
  secondIsSubmitted=false;
  controlNames = ['digit1', 'digit2', 'digit3', 'digit4'];
  counter=30;
  intervalId: any;
  canResend = false;
  availableUser=false;
  eventCategories!:EventCategories[];
  search:string="";
  selectedTags: string[] = [];
  tags:string[]=[];
  allTags:string[]=[];
  token!:string;
  ngOnInit(): void {
    this.firstPage=this.builder.group({
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.maxLength(12)]],
      confirmPassword:["",[Validators.required,Validators.maxLength(12)]]
    },{
      validators:passwordsMatchValidator('password','confirmPassword')
    })
    this.otpForm = this.builder.group(
      this.controlNames.reduce((group, name) => {
        group[name] = ['', [Validators.required, Validators.pattern('[0-9]')]];
        return group;
      }, {} as Record<string, any>)
    );
    this.secondPage=this.builder.group({
      name:["",[Validators.required,Validators.pattern('^[A-Za-z ]+$')]],
      username:["",[Validators.required,Validators.minLength(5)]],
      DOB:["",[Validators.required]],
    })
    this.event.GetAllEventCategories().subscribe((x)=>{
      this.eventCategories=x;
      for(let y of x){
        for(let z of y.tags){
          this.allTags.push(z);
        }
      }
    })
  }
  get Fc1(){
    return this.firstPage.controls;
  }
  get Fc2(){
    return this.secondPage.controls;
  }
  passShow()
  {
    if(!this.passVis ){
      this.PassTxt='visibility_off';
      this.PassType='text';
      this.passVis=true;
    }
    else{
     this.PassTxt='visibility';
       this.PassType='password';
       this.passVis=false;
    }
  }
  ConPassShow()
  {
    if(!this.ConPassVis){
      this.ConPassTxt='visibility_off';
      this.ConPassType='text';
      this.ConPassVis=true;
    }
    else{
     this.ConPassTxt='visibility';
       this.ConPassType='password';
       this.ConPassVis=false;
    }
  }
  login() {
    this.router.navigateByUrl("/login")
    }
  firstSubmit(){
    this.firstIsSubmitted=true;
    if(this.firstPage.invalid){
      return;
    }
    this.user.sendOTP(this.Fc1.email.value).subscribe({
      next:(send)=>{
        this.page1=false;
        this.page2=true;
        this.toastrServices.success("","Opt send successfully")
        this.token=send.token;

    this.setTimer()

      },error:(x)=>{
        this.toastrServices.error(x.error)
      }
    }

    )

  }
  moveFocus(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && index < this.controlNames.length - 1) {
      const next = document.querySelectorAll<HTMLInputElement>('.otp-input')[index + 1];
      next?.focus();}
  }
  moveBack(index:number){
    if(index <this.controlNames.length - 1){
      const next = document.querySelectorAll<HTMLInputElement>('.otp-input')[index + 1];
      next?.focus();
    }
  }
  moveFront(index:number){
    if(index > 0){
      const next = document.querySelectorAll<HTMLInputElement>('.otp-input')[index - 1];
      next?.focus();
    }
  }
  otpSubmit(){
    if (this.otpForm.valid) {
      const otp = Object.values(this.otpForm.value).join('');
      const data:any={
        token:this.token,
        otp:otp
      }
      this.user.verifyOTP(data).subscribe({
        next:(send)=>{
          this.page3=true;
          this.page2=false;
          this.toastrServices.success("Opt verified")


        },error:(x)=>{
          this.toastrServices.error(x)
        }
      })
    }
  }
  resendOtp() {
    if(!this.canResend){
      return;
    }
    console.log('Resend OTP clicked');
    // Implement resend logic here
  }

  setTimer(){
    console.log("C")
    this.intervalId=setInterval(()=>{
      this.counter--;
      console.log(this.counter)
      if(this.counter<=0){
        this.canResend=true;
        clearInterval(this.intervalId)
      }
    },1000)
  }
  secondSubmit(){
    this.secondIsSubmitted=true;
    if(this.secondPage.invalid && this.availableUser){
      return;
    }
    this.page3=false;
    this.page4=true;
  }
  checkUser(){
    if(this.Fc2.username.value.length<5){
      return;
    }
    // console.log(this.Fc2.username.value)
    this.user.checkUsername(this.Fc2.username.value).subscribe((x)=>{
      this.availableUser=x.allow;
      console.log(x.allow)
    })
  }





  toggleCategory(category: any) {
    category.expanded = !category.expanded;
  }

  toggleTag(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
  }
  searchTag(){
    this.tags=this.allTags.filter(tag=>
      tag.toLowerCase().includes(this.search.toLowerCase()) &&  !this.selectedTags.includes(tag)
    )
    console.log(this.tags)
  }
  autoSelect(s:string){
    this.selectedTags.push(s);
    this.search="";
    this.tags=[];
  }
  submit(x:boolean){
    let tagX:string[];
    if(x){
      tagX=this.selectedTags;
    }else{
      tagX=[]
    }
    const fv1=this.firstPage.value;
    const fv2=this.secondPage.value;
    const data:User={
      id: '',
      name: fv2.name,
      username: fv2.username,
      profile: '',
      DOB: fv2.DOB,
      gender: '',
      language: "eng",
      email: fv1.email,
      password: fv1.password,
      mode: 'free',
      mobile: '',
      insta: '',
      facebook: '',
      linkedin: '',
      type: 'user',
      subscription: false,
      subscription_End: '',
      token: '',
      interested:tagX
    }
    this.user.signup(data).subscribe(_=>{
      this.router.navigateByUrl("/")
    })
  }
}
