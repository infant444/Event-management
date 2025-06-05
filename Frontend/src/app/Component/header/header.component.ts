import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

constructor(private router:Router){}
  profile!:string;
  ngOnInit(): void {
    this.profile=this.generateInitialsImage()
  }
  generateInitialsImage(name: string="IR", size: number = 64, bgColor = '#525b66', textColor = '#ffffff'): string {
    // const initials = this.getInitials(name);
    const initials = "IR";
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
}
