import { Routes } from '@angular/router';
import { EnterpageComponent } from './Component/enterpage/enterpage.component';
import { AddEventComponent } from './Component/manage/add-event/add-event.component';
import { LoginComponent } from './Component/login/login.component';
import { SignupComponent } from './Component/signup/signup.component';
import { ViewEventComponent } from './Component/view-event/view-event.component';
import { HomeComponent } from './Component/home/home.component';
import { MainGuard } from './Guard/main/main.guard';

export const routes: Routes = [
  {path:"",component:HomeComponent,canActivate:[MainGuard]},
  {path:"organizer/add-event",component:AddEventComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"viewEvent/:eventid",component:ViewEventComponent},
  {path:"enter",component:EnterpageComponent}
];
