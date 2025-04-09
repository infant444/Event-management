import { Routes } from '@angular/router';
import { EnterpageComponent } from './Component/enterpage/enterpage.component';
import { AddEventComponent } from './Component/manage/add-event/add-event.component';

export const routes: Routes = [
  {path:"",component:EnterpageComponent},
  {path:"organizer/add-event",component:AddEventComponent}
];
