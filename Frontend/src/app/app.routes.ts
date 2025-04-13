import { Routes } from '@angular/router';
import { EnterpageComponent } from './Component/enterpage/enterpage.component';
import { AddEventComponent } from './Component/manage/add-event/add-event.component';
import { LoginComponent } from './Component/login/login.component';
import { SignupComponent } from './Component/signup/signup.component';
import { ViewEventComponent } from './Component/view-event/view-event.component';

export const routes: Routes = [
  {path:"",component:EnterpageComponent},
  {path:"organizer/add-event",component:AddEventComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"viewEvent/:eventid",component:ViewEventComponent}
];
