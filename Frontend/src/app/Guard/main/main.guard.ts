import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../Services/user/user.service';
import { User } from '../../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {

  constructor(private router: Router,private userService:UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user!:User;
     this.userService.userObservable.subscribe((newUser)=>{
    user=newUser;

  })
  // console.log(user)
  // console.log(this.userService.currentUser)
    if (this.userService.currentUser.token) {
      // console.log("hello")
      return true;
    } else {
      console.log("nouser");
      return this.router.navigate(['/enter'],);
      return false;
    }
  }
}
