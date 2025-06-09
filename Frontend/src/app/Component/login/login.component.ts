import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user/user.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmit = false;
  passVis = false;
  PassTxt = 'visibility';
  PassType = 'password';
  constructor(private formBuilder: FormBuilder, private router: Router,private userServices:UserService) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      pass: ["", Validators.required],
    });
  }

  get Fc1() {
    return this.loginForm.controls;
  }
  passShow() {
    if (!this.passVis) {
      this.PassTxt = 'visibility_off';
      this.PassType = 'text';
      this.passVis = true;
    }
    else {
      this.PassTxt = 'visibility';
      this.PassType = 'password';
      this.passVis = false;
    }
  }
  isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  submit(): void {
    this.isSubmit = true;
    if (this.loginForm.invalid) {
      return;
    }
    const Fx=this.loginForm.value;
    let type="";
    if(this.isValidEmail(Fx.email)){
      type="email";
    }else{
      type="Username";
    }
    const x:any={
      user:Fx.email,
      pass:Fx.pass,
      type:type,
    }
    this.userServices.login(x).subscribe((x)=>{
    this.router.navigateByUrl("/")

    })
  }
  signup() {
    this.router.navigateByUrl("/signup")

  }
}
