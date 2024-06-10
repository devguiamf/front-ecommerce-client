import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CartItem} from "../../shopping-cart.interface";

@Component({
  selector: 'app-list-cart-items',
  templateUrl: './list-cart-items.component.html',
  styleUrl: './list-cart-items.component.scss'
})
export class ListCartItemsComponent {

  @Input() cartItems: CartItem[] = [];
  @Output() removeItemEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectItemToBuyEvent: EventEmitter<CartItem> = new EventEmitter<CartItem>();

  removeItem(productId: string) {
    this.removeItemEvent.emit(productId);
  }

  selectItemToBuy(item: CartItem) {
    this.selectItemToBuyEvent.emit(item);
  }
}
