import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartItem} from "../../../shopping-cart.interface";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent implements OnInit{
  @Input({required: true}) cartItem!: CartItem;
  @Output() removeItemEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectItemToBuyEvent: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  quantityItem!: number;
  totalItem!: number;


  ngOnInit(): void {
    this.quantityItem = this.cartItem.quantity;
    this.totalItem = this.cartItem.total;
  }

  removeItem() {
    this.removeItemEvent.emit(this.cartItem.productId);
  }

  decrementQuantityProduct() {
    if (this.quantityItem > 1) {
      this.quantityItem--;
      this.totalItem = this.cartItem.price * this.quantityItem;
    }
  }

  incrementQuantityProduct() {
    this.quantityItem++;
    this.totalItem = this.cartItem.price * this.quantityItem;
  }

  selectItemToBuy() {
    const item: CartItem = {
      productId: this.cartItem.productId,
      productName: this.cartItem.productName,
      quantity: this.quantityItem,
      price: this.cartItem.price,
      image: this.cartItem.image,
      total: this.totalItem,
      checked: true
    }
    this.selectItemToBuyEvent.emit(item);
  }
}
