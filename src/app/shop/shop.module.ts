import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './routes/shop-routing.module';
import { ShopComponent } from './page/shop.component';
import { HeaderComponent } from '../fixed/header/header.component';
import { CarouselComponent } from '../fixed/carousel/carousel.component';
import { ProductItemCardComponent } from '../products/components/product-list/product-item-card/product-item-card.component';
import {ProductsModule} from "../products/products.module";
import {MatPaginator} from "@angular/material/paginator";
import {AppModule} from "../app.module";
import {PaginatorComponent} from "../@shared/components/paginator/paginator.component";
import {FooterComponent} from "../fixed/footer/footer.component";


@NgModule({
  declarations: [
    ShopComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    HeaderComponent,
    CarouselComponent,
    ProductItemCardComponent,
    ProductsModule,
    MatPaginator,
    PaginatorComponent,
    FooterComponent
  ]
})
export class ShopModule { }
