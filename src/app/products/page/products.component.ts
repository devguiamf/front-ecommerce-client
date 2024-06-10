import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../product.interface";
import {LocalStorageService, StorageKeys} from "../../@shared/services/local-storage.service";
import {UserLoggeed} from "../../@shared/interfaces/user.interface";
import {ShoppingCartService} from "../../shopping-cart/service/shopping-cart.service";
import {SnackBarNotificationService} from "../../@shared/services/snack-bar-notification.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  productParams!: ProductParamsRoute;
  productDetails!: Product;
  userLogged!: UserLoggeed;
  counterQuantityProduct = 1;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private localStorage: LocalStorageService,
    private shoppingCartService: ShoppingCartService,
    private snackBarService: SnackBarNotificationService
  ) {
    this.verifyUserLogged();
    this.activeRoute.params.subscribe(params => {
      this.productParams = params as any;
      this.getProductDetailsService();
    })
  }

  verifyUserLogged() {
    this.userLogged = this.localStorage.get(StorageKeys.user_logged_info);
  }

  getProductDetailsService() {
    this.productService.getProductDetailsHttp(this.productParams.id)
      .subscribe({
        next: (response) => {
          this.productDetails = response;
        },
        error: (error: HttpErrorResponse) => {
          this.errorHandler(error);
        }
      })
  }

  decrementQuantityProduct() {
    if (this.counterQuantityProduct > 1) {
      this.counterQuantityProduct--;
    }
  }

  incrementQuantityProduct() {
    this.counterQuantityProduct++;
  }

  async addProductCart(){
    if (!this.userLogged) {
      await this.router.navigate(['/login'], {queryParams: {from: this.router.url}});
      return;
    }

    this.shoppingCartService.addCartItemToBehaviorList$(this.mountCartItem());
    this.snackBarService.openSuccessSnackBar('Produto adicionado ao carrinho!');
  }

  async buyProduct() {
    if (!this.userLogged) {
      await this.router.navigate(['/login'], {queryParams: {from: this.router.url}});
      return;
    }

    this.shoppingCartService.addCartItemToBehaviorList$(this.mountCartItem());
    await this.router.navigate(['/shopping-cart']);
  }

  mountCartItem() {
    return {
      productId: this.productDetails.id,
      productName: this.productDetails.name,
      quantity: this.counterQuantityProduct,
      price: this.productDetails.price,
      image: this.productDetails.image,
      total: this.productDetails.price * this.counterQuantityProduct
    }
  }

  errorHandler(error: HttpErrorResponse){
    console.error('Error: ', error);
    alert('Error: ' + error.error.message);
  }
}

export interface ProductParamsRoute {
  id: string;
  category: string;
  subcategory: string;
}
