import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { passwordsMatchValidator } from '../../models/validator/confirm_password';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,MatIconModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  constructor(private user:UserService,
    private builder:FormBuilder,
    private router:Router
  ){

  }
  firstPage!:FormGroup;
  secondPage!:FormGroup;
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
  ngOnInit(): void {
    this.firstPage=this.builder.group({
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.maxLength(12)]],
      confirmPassword:["",[Validators.required,Validators.maxLength(12)]]
    },{
      Validators:passwordsMatchValidator('password','confirmPassword')
    })
  }
  get Fc1(){
    return this.firstPage.controls;
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

  }
}
