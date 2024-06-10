import {Component, Inject, OnInit} from '@angular/core';
import {LoginService} from "../service/login.service";
import {LocalStorageService, StorageKeys} from "../../../@shared/services/local-storage.service";
import {SnackBarNotificationService} from "../../../@shared/services/snack-bar-notification.service";
import {Login, LoginApiResponse} from "../login.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {UserLoggeed} from "../../../@shared/interfaces/user.interface";
import {environment} from "../../../../environments/environment.development";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  private redirectUrl: string = '';
  loading: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private storage: LocalStorageService,
    private snackBarService: SnackBarNotificationService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if(params && params['from']){
        this.redirectUrl = params['from'];
      }
    });
  }

  receiveLoginEvent(login: Login){
    this.loading = true;
    this.sendLoginService(login)
  }

  sendLoginService(login: Login){
    this.loginService.sendLoginToApi(login)
      .subscribe({
        next: async (response: LoginApiResponse) => {

          this.deactivateLoading()
          this.setUserLoggedInfo(response.user);
          this.setUserLoggedToken(response.authToken);

          if(this.redirectUrl){
            await this.router.navigateByUrl(this.redirectUrl);
            return;
          }

          await this.router.navigate(['/shop']);
        },
        error: (error: HttpErrorResponse) => {
          this.deactivateLoading()
          this.snackBarService.openErrorSnackBar('Erro ao entrar: ' + (error.error.message ?? 'Erro desconhecido'))
        },
      });
  }

  setUserLoggedInfo(user: UserLoggeed){
    this.storage.set(StorageKeys.user_logged_info, user);
  }

  setUserLoggedToken(token: string){
    this.storage.set(StorageKeys.user_logged_token, token);
  }

  deactivateLoading(){
    this.loading = false;
  }

  activateLoading(){
    this.loading = true;
  }
}
