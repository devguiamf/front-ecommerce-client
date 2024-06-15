import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmationSignupService } from '../service/confirmation-signup.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-confirmation-signup',
  templateUrl: './confirmation-signup.component.html',
  styleUrl: './confirmation-signup.component.scss'
})
export class ConfirmationSignupComponent {
  token!: string;
  loading: boolean = true;
  error: boolean = true;
  success: boolean = false;
  destroy$: Subject<void> = new Subject<void>();
  errorMessage: string = '';

  constructor(
    private routerActivate: ActivatedRoute,
    private route: Router,
    private confirmationEmailService: ConfirmationSignupService
  ) {
    this.verifyTokenConfirmation();
  }

  verifyTokenConfirmation() {
    console.log('verifyTokenConfirmation');
    
    this.routerActivate.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        alert('Token não encontrado, verifique o link enviado por e-mail e tente novamente.');
        this.route.navigate(['/login']);
        return
      }
      this.confirmEmail();
    });
  }

  confirmEmail() {
    this.confirmationEmailService.confirmEmailHttp(this.token)
      .pipe(takeUntil(this.destroy$))  
      .subscribe({
        next: () => {
          this.loading = false;
          this.error = false;
        },
        error: (error: HttpErrorResponse) => {
          if(error.status === 404 || error.status === 401){
            this.errorMessage = 'Convite expirado ou inválido, solicite um novo convite.';
          }

          if(error.status === 500){
            this.errorMessage = 'Ocorreu um erro inesperado, tente novamente mais tarde.';
          }

          this.loading = false;
          this.error = true;
        }
      })
  }

  ngOnDestroy(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }

}
