import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopSearchRoutingModule } from './routes/shop-search-routing.module';
import { ShopSearchComponent } from './page/shop-search.component';
import {ShopSearchService} from "./service/shop-search.service";
import {PaginatorComponent} from "../@shared/components/paginator/paginator.component";
import {ProductsModule} from "../products/products.module";
import {HeaderComponent} from "../fixed/header/header.component";
import {FooterComponent} from "../fixed/footer/footer.component";


@NgModule({
  declarations: [
    ShopSearchComponent
  ],
  imports: [
    CommonModule,
    ShopSearchRoutingModule,
    PaginatorComponent,
    ProductsModule,
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    ShopSearchService
  ]
})
export class ShopSearchModule { }
