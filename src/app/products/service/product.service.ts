import { Injectable } from '@angular/core';
import {Product, ProductPage} from '../product.interface';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import {LocalStorageService, StorageKeys} from "../../@shared/services/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpHeaders: HttpHeaders

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.get(StorageKeys.user_logged_token)}`
    });
  }

  getProductDetailsHttp(id: string): Observable<Product>{
    return this.http.get<Product>(`${environment.api}/showcase/products/${id}`);
  }

  getProductsShowcaseHttp(query: string): Observable<ProductPage>{
    return this.http.get<ProductPage>(`${environment.api}/showcase/products${query}`);
  }
}
