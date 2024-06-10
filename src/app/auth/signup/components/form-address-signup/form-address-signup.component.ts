import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {CepResponsePipe,} from "../../signup.interface";

@Component({
  selector: 'app-form-address-signup',
  templateUrl: './form-address-signup.component.html',
  styleUrl: './form-address-signup.component.scss'
})
export class FormAddressSignupComponent implements OnDestroy, OnChanges {

  @Input() cepResponse: CepResponsePipe | null = null;
  @Output() sendFormAddressEvent = new EventEmitter<FormGroup>()
  @Output() getFormByCepEvent = new EventEmitter<string>()
  private destroy$: Subject<void> = new Subject<void>();
  formAddress!: FormGroup;
  spinnerCEP: boolean = false;

  constructor(
    private fb: FormBuilder,
  ) {
    this.buildFormAddress();
    this.observeCEPChanges();
    this.observeFormChanges();
  }

  buildFormAddress(): void {
    this.formAddress = this.fb.group({
      cep: [null, [Validators.required]],
      address: [null, [Validators.required]],
      number: [null, [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
    });

    this.sendAddress();

  }

  observeCEPChanges(): void {
    this.formAddress.get('cep')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value.length === 8) {
          this.activateSpinner();
          this.getFormByCepEvent.emit(value);
        }
      });
  }

  observeFormChanges() {
    return this.formAddress.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.sendAddress()
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['cepResponse'] && changes['cepResponse'].currentValue){
      this.patchAddress(changes['cepResponse'].currentValue);
    }
  }

  patchAddress(address: CepResponsePipe): void {
    this.formAddress.patchValue({
      address: address.address,
      state: address.state,
      city: address.city,
    });
    this.deactivateSpinner();
  }

  validatorFormField(form: FormGroup, campo: string): boolean {
    return (form.get(campo)?.touched && form.get(campo)?.invalid) ?? false;
  }

  getErrorMessage(form: FormGroup, campo: string): string {
    if (form.get(campo)?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (form.get(campo)?.hasError('email')) {
      return 'E-mail inválido';
    }

    if (form.get(campo)?.hasError('minlength')) {
      return 'Mínimo de 8 caracteres';
    }

    if (form.get(campo)?.hasError('pattern')) {
      return 'Senha deve conter pelo menos: 1 letra maiúscula e 1 caractere';
    }

    return '';
  }

  activateSpinner(): void {
    this.spinnerCEP = true;
  }

  deactivateSpinner(): void {
    this.spinnerCEP = false;
  }

  sendAddress(): void {
    this.sendFormAddressEvent.emit(this.formAddress);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

export interface FormAddressObject {
  cep: string,
  address: string,
  number: string,
  state: string,
  city: string,
}
