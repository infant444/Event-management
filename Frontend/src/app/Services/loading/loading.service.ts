import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  constructor() { }
  show() {
    this.isLoadingSubject.next(true);

  }
  hide() {
    this.isLoadingSubject.next(false);
  }

  get isLoading() {
    return this.isLoadingSubject.asObservable();

  }
}
