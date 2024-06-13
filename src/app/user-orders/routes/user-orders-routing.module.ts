import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserOrdersComponent } from '../page/user-orders.component';

const routes: Routes = [{ path: '', component: UserOrdersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserOrdersRoutingModule { }
