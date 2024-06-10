import { Component, Input } from '@angular/core';
import { FormAccountObject } from '../form-account-signup/form-account-signup.component';
import { FormAddressObject } from '../form-address-signup/form-address-signup.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-forms',
  templateUrl: './verify-forms.component.html',
  styleUrl: './verify-forms.component.scss'
})
export class VerifyFormsComponent {
  @Input({required: true}) formAccountForm!: FormGroup;
  @Input({required: true}) formAddressForm!: FormGroup;

  constructor(){}
}
