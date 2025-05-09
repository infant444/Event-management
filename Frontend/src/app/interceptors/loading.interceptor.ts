import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoadingService } from '../Services/loading/loading.service';
var pendingRequest=0;
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoadingService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.show();
    pendingRequest=pendingRequest+1;

    return next.handle(req).pipe(
      tap({
        next:(event)=>{
          if(event.type===HttpEventType.Response){
            this.handleHide();
          }
        },
        error:(_)=>
        {
          this.handleHide();
        }
      })
    );
  }
  handleHide(){
    pendingRequest=pendingRequest-1;
    if(pendingRequest==0)
    {
      this.loaderService.hide();
    }
  }
}
