import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { CheckoutRoutingModule } from './routes/checkout-routing.module';
import { CheckoutComponent } from './page/checkout.component';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { PaymentComponent } from './components/payment/payment.component';
import {HeaderComponent} from "../fixed/header/header.component";
import {MatIcon} from "@angular/material/icon";
import { ProductSelectedListComponent } from './components/product-selected-list/product-selected-list.component';
import { ProductSelectedComponent } from './components/product-selected-list/product-selected/product-selected.component';
import { QrcodeDialogComponent } from './components/qrcode-dialog/qrcode-dialog.component';
import { ProductsModule } from '../products/products.module';


@NgModule({
  declarations: [
    CheckoutComponent,
    ShippingAddressComponent,
    PaymentComponent,
    ProductSelectedListComponent,
    ProductSelectedComponent,
    QrcodeDialogComponent,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    HeaderComponent,
    MatIcon,
    NgOptimizedImage,
    ProductsModule
  ]
})
export class CheckoutModule { }
