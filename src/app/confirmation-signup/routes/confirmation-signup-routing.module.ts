import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationSignupComponent } from '../page/confirmation-signup.component';

const routes: Routes = [{ path: '', component: ConfirmationSignupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmationSignupRoutingModule { }
