import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService, StorageKeys } from '../../@shared/services/local-storage.service';
import { OrderPage } from '../user-orders.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserOrdersService {

  httpHeaders: HttpHeaders

  constructor(
    private localStorage: LocalStorageService,
  ) { 
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.localStorage.get(StorageKeys.user_logged_token)
    });
  }

  getOrdersHttp(): Observable<OrderPage> {
    return of({
      total: 1,
      pages: 1,
      currentPage: 1,
      items: [
        {
          orderId: '1',
          items: [
            {
              productId: '1',
              productName: 'Product 1',
              quantity: 1,
              unitPrice: 10,
              totalAmount: 10
            }
          ],
          paymentMethod: 'Pix',
          paymentDetails: {
            customerKey: '481.960.578-06'
          },
          deliveryAddress: {
            cep: '123456',
            address: 'Street 1',
            number: '123',
            state: 'State 1',
            city: 'City 1'
          },
          totalAmount: 10,
          status: 'Delivered',
          date: '2021-09-01'
        }
      ]
    })
  }
}
