import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './routes/login-routing.module';
import { LoginComponent } from './page/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './service/login.service';
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    LoginService,
  ]
})
export class LoginModule { }
