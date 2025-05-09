import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CHECK_USER, OTP_VERIFY, SEND_OTP, SIGNUP } from '../../models/constant.model';
import { User } from '../../models/user.model';
import { T } from '@angular/cdk/keycodes';
import { USER_KEY } from '../../models/data/someimport.key';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserLocalStorage());
  public userObservable: Observable<User>;
  constructor(private http:HttpClient,
    private toastrService:ToastrService
  ) {
    this.userObservable = this.userSubject.asObservable();

   }

   checkUsername(name:string):Observable<any>{
    return this.http.get<any>(CHECK_USER+name)
   }
   sendOTP(email:string):Observable<any>{
    return this.http.get<any>(SEND_OTP+email)
   }
   verifyOTP(data:any):Observable<any>{
    return this.http.post<any>(OTP_VERIFY,data)
   }
   signup(data:User):Observable<User>{
    return this.http.post<User>(SIGNUP,data).pipe(
      tap({
        next:(user)=>{
          this.userSubject.next(user);
          this.toastrService.success("Welcome to RI PlanIt")
          console.log(user.token);
          this.setUserToLocalStorage(user);
        } , error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failes')
        }
      })
    )
   }



  //  localstorage
  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }
  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }



  private getUserLocalStorage(): User {
    const x = localStorage.getItem(USER_KEY);
    if (x) {
      return JSON.parse(x);
    }
    else {
      return new User();
    }
  }

}

