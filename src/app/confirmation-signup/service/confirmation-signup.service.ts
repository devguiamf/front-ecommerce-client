import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../@shared/services/local-storage.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationSignupService {

  httpHeaders: HttpHeaders


  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.localStorage.get('token')}`
    });
  }

  confirmEmailHttp(confirmationId: string): Observable<any> {
    return this.http.post(`${environment.api}/sign-up/${confirmationId}/confirm`, {}, {
      headers: this.httpHeaders
    });
  }
}
