import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {Checkout} from "../checkout.interface";
import {LocalStorageService, StorageKeys} from "../../@shared/services/local-storage.service";
import { Observable, of } from 'rxjs';
import { Product } from '../../products/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  header: HttpHeaders

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {
    const token = this.localStorage.get(StorageKeys.user_logged_token)
    this.header = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  }

  finishCheckout(checkoutData: Checkout) {
    return this.httpClient.post(`${environment.api}/checkout`,
      checkoutData,
      { headers: this.header }
    )
  }


}
