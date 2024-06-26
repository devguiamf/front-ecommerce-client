import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Product} from "../../product.interface";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent{
  @Input() productsItems!: Product[]
}
