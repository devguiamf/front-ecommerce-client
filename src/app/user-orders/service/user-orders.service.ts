import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService, StorageKeys } from '../../@shared/services/local-storage.service';
import { OrderPage } from '../user-orders.interface';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserOrdersService {

  httpHeaders: HttpHeaders

  constructor(
    private localStorage: LocalStorageService,
    private http: HttpClient
  ) { 
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.localStorage.get(StorageKeys.user_logged_token)
    });
  }

  getOrdersHttp(): Observable<OrderPage> {
    return this.http.get<OrderPage>(`${environment.api}/orders`, { headers: this.httpHeaders })
  }
}
