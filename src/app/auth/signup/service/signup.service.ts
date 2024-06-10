import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import { SnackBarNotificationService } from '../../../@shared/services/snack-bar-notification.service';
import { CepResponseApi, CepResponsePipe, singupRequest, singupResponse } from '../signup.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SingupService {

  constructor(
    private http: HttpClient,
    private snackBarService: SnackBarNotificationService
  ) { }

  getCEPFromApi(cep: string) : Observable<CepResponsePipe> {
    return this.http.get<CepResponsePipe>(`https://viacep.com.br/ws/${cep}/json/`)
      .pipe(
        catchError((error) => {
          return of(error);
        }),
        map((response: CepResponseApi) => {
            return {
              address: response.logradouro,
              state: response.uf,
              city: response.localidade,
            }
          }
        )
      );
  }

  singup(singupRequest: singupRequest): Observable<singupResponse> {
    return this.http.post<singupResponse>(`${environment.api}/sign-up`, singupRequest)
  }
}
