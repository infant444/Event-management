import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./Component/header/header.component";
import { EventService } from './Services/event/event.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from "./Component/loading/loading.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(
    private eventServices:EventService
  ){
  }
  title = 'Frontend';
  ngOnInit(): void {
      this.eventServices.UpdateEventStatus().subscribe((x)=>{
        console.log(x);
      })
  }
}
