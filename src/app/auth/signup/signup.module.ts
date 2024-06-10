import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './routes/signup-routing.module';
import { SignupComponent } from './page/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SingupService } from './service/signup.service';
import { FormAccountSignupComponent } from './components/form-account-signup/form-account-signup.component';
import { FormAddressSignupComponent } from './components/form-address-signup/form-address-signup.component';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import { VerifyFormsComponent } from './components/verify-forms/verify-forms.component';


@NgModule({
  declarations: [
    SignupComponent,
    FormAccountSignupComponent,
    FormAddressSignupComponent,
    VerifyFormsComponent
  ],
    imports: [
        CommonModule,
        SignupRoutingModule,
        ReactiveFormsModule,
        MatStepperModule,
        MatProgressSpinner,
    ],
  providers: [
    SingupService,
  ]
})
export class SignupModule { }
