import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-form-account-signup',
  templateUrl: './form-account-signup.component.html',
  styleUrl: './form-account-signup.component.scss'
})
export class FormAccountSignupComponent {

  @Output() sendFormAccountEvent = new EventEmitter<any>()

  formAccount!: FormGroup;
  inputPasswordType: string = 'password';
  destroy$: Subject<void> = new Subject<void>();


  constructor(
    private fb: FormBuilder
  ) {
    this.buildFormAccount();
    this.observeFormChanges();
  }

  buildFormAccount(): void {
    this.formAccount = this.fb.group({
      name: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.pattern('^((?!.*\\s)(?=.*[A-Z])(?=.*\\d).{8,99})')]],
    });

    this.sendAccount();
  }

  showPassword(): void {
    this.inputPasswordType = this.inputPasswordType === 'password' ? 'text' : 'password';
  }

  validatorFormField(form: FormGroup, campo: string): boolean {
    return (form.get(campo)?.touched && form.get(campo)?.invalid) ?? false;
  }

  getErrorFieldMessage(field: string): string {
    if (this.formAccount.get(field)?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (this.formAccount.get(field)?.hasError('email')) {
      return 'E-mail inválido';
    }

    if (this.formAccount.get(field)?.hasError('minlength')) {
      return 'Mínimo de 8 caracteres';
    }

    if (this.formAccount.get(field)?.hasError('pattern')) {
      return 'Senha deve conter pelo menos: 1 letra maiúscula e 1 caractere';
    }

    return '';
  }

  sendAccount(): void {
    this.sendFormAccountEvent.emit(this.formAccount);
  }

  observeFormChanges() {
    return this.formAccount.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.sendAccount();
        }
      });
  }
}

export interface FormAccountObject {
  name: string,
  cpf: string,
  phone: string,
  email: string,
  password: string,
}

