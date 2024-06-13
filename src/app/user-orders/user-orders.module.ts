import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserOrdersComponent } from './page/user-orders.component';
import { UserOrdersRoutingModule } from './routes/user-orders-routing.module';
import { UserOrdersService } from './service/user-orders.service';
import { HeaderComponent } from '../fixed/header/header.component';
import { ListOrdersComponent } from './components/list-orders/list-orders.component';
import { OrderComponent } from './components/list-orders/order/order.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { TruncatePipe } from '../@shared/pipes/truncate.pipe';


@NgModule({
  declarations: [
    UserOrdersComponent,
    ListOrdersComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    UserOrdersRoutingModule,
    HeaderComponent,
    MatExpansionModule,
    MatIcon,
    TruncatePipe
  ],
  providers: [
    UserOrdersService
  ]
})
export class UserOrdersModule { }
