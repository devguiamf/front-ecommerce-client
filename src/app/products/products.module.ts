import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';

import { ProductsComponent } from './page/products.component';
import { ProductItemCardComponent } from './components/product-list/product-item-card/product-item-card.component';
import { ProductsRoutingModule } from './routes/products-routing.module';
import { ProductService } from './service/product.service';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HeaderComponent} from "../fixed/header/header.component";
import {MatIcon} from "@angular/material/icon";
import { MatCard, MatCardModule } from '@angular/material/card';
import { TruncatePipe } from '../@shared/pipes/truncate.pipe';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent,
    ProductItemCardComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HeaderComponent,
    MatIcon,
    NgOptimizedImage,
    MatCardModule,
    TruncatePipe,
    CurrencyPipe,
  ],
  exports: [
    ProductListComponent,
    ProductItemCardComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductsModule { }
