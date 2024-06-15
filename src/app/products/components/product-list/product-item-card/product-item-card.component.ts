import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../../../product.interface';


@Component({
  selector: 'app-product-item-card',
  templateUrl: './product-item-card.component.html',
  styleUrl: './product-item-card.component.scss',
})
export class ProductItemCardComponent{
  @Input({required: true}) product!: Product

}
