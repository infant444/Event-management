import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user/user.service';
import { User } from '../../models/user.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [CommonModule,MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

constructor(private router:Router,private userServices:UserService){}
  profile!:string;
    user!:User;
    arrow="expand_more";
    down:boolean=false;
    down1:boolean=false;
    arrow1="menu";

  ngOnInit(): void {
      this.userServices.userObservable.subscribe((newUser)=>{
    this.user=newUser;
    if(this.user){
// if(!this.user.profile){
      let x = this.user && this.user.name ? this.user.name.split(" ") : [];
      let y:string="";
      let count=0;
      x.forEach(element => {
        if(count<2){
          y+=element[0];
          count++;
        }
      });
      console.log(y);
      this.profile=this.generateInitialsImage(y);
    // }
    }

  })

  }

  generateInitialsImage(name: string, size: number = 64, bgColor = '#525b66', textColor = '#ffffff'): string {
    // const initials = this.getInitials(name);
    const initials = name;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
        <rect width="100%" height="100%" fill="${bgColor}"/>
        <text x="50%" y="60%" dy=".1em" text-anchor="middle" fill="${textColor}"
              font-family="Arial" font-size="${size / 2}" font-weight="bold">
          ${initials}
        </text>
      </svg>
    `;
    return 'data:image/svg+xml;base64,' + btoa(svg);
  }
  login(){
    this.router.navigateByUrl("/login");
  }
  main() {
    this.router.navigateByUrl("/")
}
extra(){
  if(this.down){
    this.down=false;
    this.arrow="expand_more";

  }else{
     this.down=true;
    this.arrow="expand_less";
  }
}
menu(){
  if(this.down1){
    this.down1=false;
    this.arrow1="menu";

  }else{
     this.down1=true;
    this.arrow1="close";
  }
}
}
