import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../../Services/event/event.service';
import { CommonModule } from '@angular/common';
import { Events } from '../../models/Event.model';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-list-events',
  imports: [ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './list-events.component.html',
  styleUrl: './list-events.component.css'
})
export class ListEventsComponent implements OnInit {
  constructor(private eventServices: EventService) {

  }
  events?: Events[];
  ngOnInit(): void {
    this.eventServices.GetAllEvent().subscribe((event) => {
      this.events = event;
    })
    console.log(this.events)
  }
  covertDate(dateStr: string) {

    const date = new Date(dateStr);
    const options = { month: 'short' as 'short', day: 'numeric' as 'numeric' };
    const formatted = date.toLocaleDateString('en-US', options);
    return formatted;
  }
  convertTo12Hour(time24: string): string {
    const [hour, minute] = time24.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
  }
}
