import { Component, Input } from '@angular/core';
import { Product, ProductItemResume } from '../../../product.interface';
import { MatCardModule } from '@angular/material/card';
import { TruncatePipe } from '../../../../@shared/pipes/truncate.pipe';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-product-item-card',
  templateUrl: './product-item-card.component.html',
  styleUrl: './product-item-card.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    TruncatePipe,
    CurrencyPipe,
    NgOptimizedImage
  ]
})
export class ProductItemCardComponent {
  @Input({required: true}) product!: Product
}
