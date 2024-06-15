import { Component, OnDestroy } from '@angular/core';
import { LocalStorageService, StorageKeys } from '../../@shared/services/local-storage.service';
import { UserLoggeed } from '../../@shared/interfaces/user.interface';
import { UserOrdersService } from '../service/user-orders.service';
import { Subject, takeUntil } from 'rxjs';
import { OrderComponent } from '../components/list-orders/order/order.component';
import { OrderPage } from '../user-orders.interface';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss'
})
export class UserOrdersComponent implements OnDestroy {
  userLogged: UserLoggeed | null = null;
  destroy$: Subject<void> = new Subject<void>();
  ordersPage: OrderPage = {pages: 0, currentPage: 0, total: 0, items: []} 

  constructor(
    private localStorage: LocalStorageService,
    private orderService: UserOrdersService
  ){
    this.verifyUserLogged();
    this.getOrdersService();
  }

  verifyUserLogged() {
    this.userLogged = this.localStorage.get(StorageKeys.user_logged_info);
  }

  getOrdersService() {
    this.orderService.getOrdersHttp()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.ordersPage = response;
          console.log('Orders: ', this.ordersPage);
          
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
