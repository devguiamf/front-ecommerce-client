import {Component, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {UserLoggeed} from "../../@shared/interfaces/user.interface";
import {LocalStorageService, StorageKeys} from "../../@shared/services/local-storage.service";
import {CartItem} from "../../shopping-cart/shopping-cart.interface";
import {MatDialog} from "@angular/material/dialog";
import {QrcodeDialogComponent} from "../components/qrcode-dialog/qrcode-dialog.component";
import {Subject, takeUntil} from "rxjs";
import {CheckoutService} from "../service/checkout.service";
import {Checkout} from "../checkout.interface";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarNotificationService} from "../../@shared/services/snack-bar-notification.service";
import { Product } from '../../products/product.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements  OnDestroy {

  userLogged: UserLoggeed
  productSelectedInfos!: CartItem[];
  destroy$: Subject<void> = new Subject<void>();
  

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private dialog: MatDialog,
    private checkoutService: CheckoutService,
    private snakbarService: SnackBarNotificationService
  ) {
    this.userLogged = this.localStorage.get(StorageKeys.user_logged_info);
    this.receiveDataFromPreviousPage();
  }

  receiveDataFromPreviousPage() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.productSelectedInfos = navigation?.extras.state['data'] as CartItem[];
    }
  }

  receiveFinishBuyEvent() {
    this.dialog.open(QrcodeDialogComponent)
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (value: boolean) => {
        if(value) {
          this.sendBuyService();
        }
        return;
      });
  }

  sendBuyService() {
    const checkoutData = this.mountCheckoutData();
    this.checkoutService.finishCheckout(checkoutData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: async () => {
          this.removeItemCartFromLocalStorage();
          this.snakbarService.openSuccessSnackBar('Compra finalizada com sucesso!');
          await this.router.navigate(['/shop']);
        },
        error: async (error) => {
          this.snakbarService.openErrorSnackBar('Erro ao finalizar compra: ' + error.error.message);
        }
      })
  }

  mountCheckoutData(): Checkout {
    const items = this.productSelectedInfos.map(
      product => ({productId: product.productId, quantity: product.quantity})
    )
    return {
      cartItems: items,
      deliveryAddress: this.userLogged.address,
      paymentMethod: "pix",
      paymentDetails: {
        customerKey: "legostartbr@gmail.com"
      }
    }
  }

  removeItemCartFromLocalStorage() {
    const listCartItens = this.localStorage.get(StorageKeys.cart_items) as CartItem[];
    const result = listCartItens.filter(itemCart => !this.productSelectedInfos.some(itemSelected => itemCart.productId === itemSelected.productId));
    this.localStorage.set(StorageKeys.cart_items, result);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
