import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { EventService } from '../../Services/event/event.service';
import { CommonModule } from '@angular/common';
import { Events } from '../../models/Event.model';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-list-events',
  imports: [ReactiveFormsModule,CommonModule,MatIconModule],
  templateUrl: './list-events.component.html',
  styleUrl: './list-events.component.css'
})
export class ListEventsComponent implements OnInit{
  constructor(private eventServices:EventService){

  }
  events?:Events[];
  ngOnInit(): void {
    this.eventServices.GetAllEvent().subscribe((event)=>{
      this.events=event;
    })
    console.log(this.events)
  }
}
