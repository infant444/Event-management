import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADD_EVENT, LIST_EVENT, UPDATE_EVENT_STATUS } from '../../models/constant.model';
import { Events } from '../../models/Event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient) { }
  AddEvent(x:FormData):Observable<Event>{
    return this.http.post<Event>(ADD_EVENT,x);
  }
  GetAllEvent():Observable<Events[]>{
    return this.http.get<Events[]>(LIST_EVENT);
  }
  UpdateEventStatus():Observable<any>{
    return this.http.get<any>(UPDATE_EVENT_STATUS);
  }
}

