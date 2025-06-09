import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CHECK_USER, LOGIN, OTP_VERIFY, SEND_OTP, SIGNUP } from '../../models/constant.model';
import { User } from '../../models/user.model';
import { USER_KEY } from '../../models/data/someimport.key';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(new User);
  public userObservable: Observable<User>;


  constructor(private http:HttpClient,
    private toastrService:ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
     this.userSubject = new BehaviorSubject<User>(new User());
    this.userObservable = this.userSubject.asObservable();

    // Then load from localStorage only if platform is browser
    if (isPlatformBrowser(this.platformId)) {
      const user = this.getUserLocalStorage();
      this.userSubject.next(user);
    }

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
          this.toastrService.error(errorResponse.error, 'Sign Up Fails')
        }
      })
    )
   }
   login(data:any):Observable<User>{
    return this.http.post<User>(LOGIN,data).pipe(
      tap({
        next:(user)=>{
          this.userSubject.next(user);
          this.toastrService.success("Welcome back to RI PlanIt")
          console.log(user.token);
          this.setUserToLocalStorage(user);
          console.log(this.userSubject.value);
        } , error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Fails')
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
     if (isPlatformBrowser(this.platformId)) {
      // console.log("ABC");
          const x = localStorage.getItem(USER_KEY);
          // console.log(x);
          // console.log(x);
    if (x) {
      return JSON.parse(x);
    }
    else {
      return new User();
    }
    }else{
      return new User();

    }

  }
  public get currentUser():User{
          console.log(this.userSubject.value);
    return this.userSubject?.value;
  }

}

