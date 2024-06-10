import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CartItem} from "../../../shopping-cart/shopping-cart.interface";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  @Input() productsSelected!: CartItem[];
  @Output() finishBuyEvent: EventEmitter<void> = new EventEmitter<void>();

  get total() {
    return this.productsSelected.reduce((acc, item) => acc + item.price, 0);
  }

  finishBuy() {
    this.finishBuyEvent.emit();
  }
}
