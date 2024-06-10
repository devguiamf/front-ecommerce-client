import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Login, LoginApiResponse} from '../login.interface';
import { environment } from '../../../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  sendLoginToApi(credentials: Login): Observable<LoginApiResponse> {
    return this.http.post<LoginApiResponse>(`${environment.api}/login`, credentials)
  }
}
