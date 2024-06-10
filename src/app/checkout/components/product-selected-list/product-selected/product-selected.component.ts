import {Component, Input} from '@angular/core';
import {CartItem} from "../../../../shopping-cart/shopping-cart.interface";

@Component({
  selector: 'app-product-selected',
  templateUrl: './product-selected.component.html',
  styleUrl: './product-selected.component.scss'
})
export class ProductSelectedComponent {
  @Input({ required: true }) productSelected!: CartItem;
}
