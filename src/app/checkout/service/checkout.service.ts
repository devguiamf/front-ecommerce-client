import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {Checkout} from "../checkout.interface";
import {StorageKeys} from "../../@shared/services/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  header: HttpHeaders

  constructor(
    private httpClient: HttpClient
  ) {
    this.header = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(StorageKeys.user_logged_token)}`
    })
  }

  finishCheckout(checkoutData: Checkout) {
    console.log(checkoutData)
    return this.httpClient.post(`${environment.api}/checkout`,
      {checkoutData},
      { headers: this.header }
    )
  }
}
