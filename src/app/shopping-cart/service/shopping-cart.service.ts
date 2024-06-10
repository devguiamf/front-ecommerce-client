import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {LocalStorageService, StorageKeys} from "../../@shared/services/local-storage.service";
import {CartItem} from "../shopping-cart.interface";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  listCartItems$: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  addCartItemToBehaviorList$(item: CartItem) {
    // const productExist = this.verifyExistenceProductInCart(item);
    //
    // if(productExist){
    //   this.addCartExistenceItemsToBehaviorList$(productExist);
    //   return;
    // }

    const currentValue = this.listCartItems$.value;
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
    const currentValue = this.listCartItems$.value;
    const updatedValue = currentValue.filter(item => item.productId !== productId);
    this.listCartItems$.next(updatedValue);
    this.localStorageService.set(StorageKeys.cart_items, updatedValue);
  }
}

