import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../products/product.interface";
import {CartItem} from "../../../shopping-cart/shopping-cart.interface";

@Component({
  selector: 'app-product-selected-list',
  templateUrl: './product-selected-list.component.html',
  styleUrl: './product-selected-list.component.scss'
})
export class ProductSelectedListComponent{

  @Input({ required: true }) productsSelected: CartItem[] = [];

}
