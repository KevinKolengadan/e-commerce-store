import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ViewCartComponent} from './view-cart/view-cart.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'myProfile',
    component: MyProfileComponent
  },
  {
    path: 'viewCart',
    component: ViewCartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
