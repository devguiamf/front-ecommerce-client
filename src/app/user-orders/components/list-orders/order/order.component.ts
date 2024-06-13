import { Component, Input } from '@angular/core';
import { Order } from '../../../user-orders.interface';
import { UserLoggeed } from '../../../../@shared/interfaces/user.interface';
import { LocalStorageService, StorageKeys } from '../../../../@shared/services/local-storage.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  @Input({required: true}) order!: Order
  userInfo: UserLoggeed

  constructor(private localStorage: LocalStorageService) {
    this.userInfo = this.localStorage.get(StorageKeys.user_logged_info);
  }

  get userInfoLine(){
    return this.userInfo.name + ' ' + this.mountNumberPhone(this.userInfo.phone);
  };

  get addressInfoLine(){
    return this.userInfo.address.address + ', '
      + this.userInfo.address.number + ' - '
      + this.userInfo.address.city + '/'
      + this.userInfo.address.state + ', '
      + this.userInfo.address.cep
  }

  mountNumberPhone(phone: string){
    const ddd = phone.slice(0, 2);
    const firstPart = phone.slice(2, 7);
    const secondPart = phone.slice(7, 11);

    return `+55 (${ddd}) ${firstPart}-${secondPart}`;
  }
}
