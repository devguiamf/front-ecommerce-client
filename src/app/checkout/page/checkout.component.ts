import {Component, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {UserLoggeed} from "../../@shared/interfaces/user.interface";
import {LocalStorageService, StorageKeys} from "../../@shared/services/local-storage.service";
import {CartItem} from "../../shopping-cart/shopping-cart.interface";
import {MatDialog} from "@angular/material/dialog";
import {QrcodeDialogComponent} from "../components/qrcode-dialog/qrcode-dialog.component";
import {Subject, takeUntil} from "rxjs";

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
    private dialog: MatDialog
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
          this.removeItemCartFromLocalStorage();
          await this.router.navigate(['/shop']);
        }
        return;
      });
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