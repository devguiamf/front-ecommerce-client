import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {PaginatorCustom} from "./paginator-custom";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  standalone: true,
  imports: [
    MatPaginator
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: PaginatorCustom }
  ]
})
export class PaginatorComponent {

  @Input({required: true}) totalItems: number = 0;
  @Output() changePage: EventEmitter<PageChange> = new EventEmitter<PageChange>();

  changePageProps(event: any) {
    this.changePage.emit({page: event.pageIndex + 1, limit: event.pageSize});
  }

}

export interface PageChange {
  limit: number;
  page: number;
}
