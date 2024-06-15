import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {LocalStorageService, StorageKeys} from "../../@shared/services/local-storage.service";
import {CartItem} from "../shopping-cart.interface";
import { Product, ProductRecommendationPage } from '../../products/product.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  listCartItems$: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) { }

  addCartItemToBehaviorList$(item: CartItem) {
    const currentValue = this.localStorageService.get(StorageKeys.cart_items) ?? [];
    const updatedValue = [...currentValue, item];
    this.listCartItems$.next(updatedValue);
    this.localStorageService.set(StorageKeys.cart_items, updatedValue);
  }

  addCartExistenceItemsToBehaviorList$(item: CartItem) {
    const updatedValue = this.listCartItems$.value.map(i => {
      if (i.productId === item.productId) {
        return {
          ...i,
          quantity: i.quantity + item.quantity
        }
      }
      return i;
    });
    this.listCartItems$.next(updatedValue);
    this.localStorageService.set(StorageKeys.cart_items, updatedValue);
    return;
  }

  verifyExistenceProductInCart(item: CartItem) {
    const currentValue = this.listCartItems$.value;
    const productExist = currentValue.find(i => i.productId === item.productId);
    if (productExist) {
      return productExist
    }
    return null;
  }

  removeCartItemFromBehaviorList$(productId: string) {
    const currentValue = this.localStorageService.get(StorageKeys.cart_items) ?? [];
    const updatedValue = currentValue.filter((item: any) => item.productId !== productId);
    this.listCartItems$.next(updatedValue);
    this.localStorageService.set(StorageKeys.cart_items, updatedValue);
  }

  getProductsRecomendation(idProduct: String): Observable<ProductRecommendationPage>{
    return this.http.get<ProductRecommendationPage>(`${environment.api}/showcase/products/${idProduct}/similar`)
  }
}

