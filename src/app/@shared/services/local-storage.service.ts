import { DOCUMENT } from "@angular/common";
import {Inject, Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage | undefined;
  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    this.localStorage = this.document.defaultView?.localStorage;
  }

  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    const keyStorage = this.localStorage?.getItem(key ?? '');
    return keyStorage ? JSON.parse(keyStorage) : null;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

  has(key: string) {
    return localStorage.hasOwnProperty(key);
  }

  keys() {
    return Object.keys(localStorage);
  }
}
export enum StorageKeys {
  user_logged_info = 'user_logged_info',
  user_logged_token = 'user_logged_token',
  category_menu_list = 'category_list',
  cart_items = 'cart_items'
}
