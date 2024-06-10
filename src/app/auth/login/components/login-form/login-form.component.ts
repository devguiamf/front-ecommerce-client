import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Login} from "../../login.interface";


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent{

  @Input() loading: boolean = false;
  @Output() sendLoginEvent: EventEmitter<Login> = new EventEmitter<Login>()

  typeInputPassword: string = 'password';
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.buildFormLogin();
  }

  buildFormLogin(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^((?!.*\\s)(?=.*[A-Z])(?=.*\\d).{8,99})')
      ]],
    });
  }

  errorFieldForm(campo: string): boolean {
    return (this.loginForm.get(campo)?.touched && this.loginForm.get(campo)?.invalid) ?? false
  }

  getErrorFieldMessage(campo: string): string {

    if (this.loginForm.get(campo)?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (this.loginForm.get(campo)?.hasError('email')) {
      return 'E-mail inválido';
    }

    if (this.loginForm.get(campo)?.hasError('minlength')) {
      return 'Mínimo de 8 caracteres';
    }

    if (this.loginForm.get(campo)?.hasError('pattern')) {
      return 'Senha deve conter pelo menos: 1 letra maiúscula e 1 caractere especial';
    }

    return '';
  }

  changePasswordType() {
    this.typeInputPassword = this.typeInputPassword === 'password' ? 'text' : 'password';
  };

  sendCredentials() {
    const credentials: Login = this.loginForm.value;
    this.sendLoginEvent.emit(credentials);
  }
}
