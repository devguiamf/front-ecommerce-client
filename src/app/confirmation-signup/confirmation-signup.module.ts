import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationSignupComponent } from './page/confirmation-signup.component';
import { ConfirmationSignupRoutingModule } from './routes/confirmation-signup-routing.module';
import { ConfirmationSignupService } from './service/confirmation-signup.service';
import { MatCardModule } from '@angular/material/card';
import { SpinnerComponent } from '../@shared/components/spinner/spinner.component';


@NgModule({
  declarations: [
    ConfirmationSignupComponent
  ],
  imports: [
    CommonModule,
    ConfirmationSignupRoutingModule,
    MatCardModule,
    SpinnerComponent
  ],
  providers: [
    ConfirmationSignupService
  ]
})
export class ConfirmationSignupModule { }
