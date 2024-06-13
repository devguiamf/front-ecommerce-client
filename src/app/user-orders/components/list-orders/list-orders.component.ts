import { Component, Input } from '@angular/core';
import { Order } from '../../user-orders.interface';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.scss'
})
export class ListOrdersComponent {
  @Input({required: true}) orders!: Order[]
}
