import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADD_EVENT } from '../../models/constant.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient) { }
  AddEvent(x:FormData):Observable<Event>{
    return this.http.post<Event>(ADD_EVENT,x);
  }
}

