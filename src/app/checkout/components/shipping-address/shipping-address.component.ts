import {Component, Input} from '@angular/core';
import {UserLoggeed} from "../../../@shared/interfaces/user.interface";

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.scss'
})
export class ShippingAddressComponent {
  @Input({ required: true }) userInfo!: UserLoggeed;

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

interface Address {
  address: string;
  city: string;
  state: string;
  cep: string;
  number: number;
}
