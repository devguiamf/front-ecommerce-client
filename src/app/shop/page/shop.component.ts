import { Component } from '@angular/core';
import { UserLoggeed } from '../../@shared/interfaces/user.interface';
import { LocalStorageService, StorageKeys } from '../../@shared/services/local-storage.service';
import {Product, ProductPage} from '../../products/product.interface';
import { ProductService } from '../../products/service/product.service';
import {CategoryMenuOptions, RootCategoriesService} from "../../@shared/services/root-categories.service";
import {Subject, takeUntil} from "rxjs";
import {Paginator} from "../../@shared/util/pagination/paginator";
import {PageChange} from "../../@shared/components/paginator/paginator.component";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {

  destroy$: Subject<void> = new Subject<void>();
  userLogged: UserLoggeed | null = null;
  categories!: CategoryMenuOptions[];
  paginationsOptions: Paginator = new Paginator({page: 1, limit: 10})
  productPaginator: ProductPage = {items: [], total: 0, page: 0, currentPage: 0};

  constructor(
      private localStorage: LocalStorageService,
      private productService: ProductService,
      private rootCategoryService: RootCategoriesService
  ) {
      this.verifyUserLogged();
      this.verifyCategoryMenuList();
      this.searchProductsShowcase();
  }

  verifyUserLogged() {
    this.userLogged = this.localStorage.get(StorageKeys.user_logged_info);
  }

  searchProductsShowcase() {
    const query = this.paginationsOptions.toQueryString();
    this.productService.getProductsShowcaseHttp(query)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.productPaginator = response;
        },
        error: (error) => {
          console.error('Error to search products: ', error);
        }
      });
  }

  changePageProps(event: PageChange) {
    this.paginationsOptions.page = event.page;
    this.paginationsOptions.limit = event.limit;
    this.searchProductsShowcase();
  }

  verifyCategoryMenuList() {

    this.categories = this.localStorage.get(StorageKeys.category_menu_list);

    if (this.categories) {
      return;
    }

    this.getCategoriesService();
  }

  getCategoriesService() {
    this.rootCategoryService.getCategoriesHttp()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.categories = response.items;
        this.localStorage.set(StorageKeys.category_menu_list, this.categories);
      });
  }
}
