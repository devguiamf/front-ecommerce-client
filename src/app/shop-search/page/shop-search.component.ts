import {Component, OnInit, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {UserLoggeed} from "../../@shared/interfaces/user.interface";
import {ProductPage} from "../../products/product.interface";
import {LocalStorageService, StorageKeys} from "../../@shared/services/local-storage.service";
import {ProductService} from "../../products/service/product.service";
import {CategoryMenuOptions, RootCategoriesService} from "../../@shared/services/root-categories.service";
import {PageChange} from "../../@shared/components/paginator/paginator.component";
import {Paginator} from "../../@shared/util/pagination/paginator";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-shop-search',
  templateUrl: './shop-search.component.html',
  styleUrl: './shop-search.component.scss'
})
export class ShopSearchComponent implements OnInit {
  destroy$: Subject<void> = new Subject<void>();
  userLogged: UserLoggeed | null = null;
  productPaginator: ProductPage = {items: [], total: 0, page: 1, currentPage: 1};
  paginator: Paginator = new Paginator({page: 1, limit: 10});
  categories: CategoryMenuOptions[] = [];
  searchProperties: SearchProperties = {};

  constructor(
    private localStorage: LocalStorageService,
    private productService: ProductService,
    private rootCategoryService: RootCategoriesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.verifyUserLogged();
    this.verifyCategoryMenuList();
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(
      (params) => {
        this.verifyTypeParamSearch(params)
      }
    )
  }

  verifyUserLogged() {
    this.userLogged = this.localStorage.get(StorageKeys.user_logged_info);
  }

  searchProductsShowcase(){
    const query = this.paginator.toQueryString(this.searchProperties.valueSearch);
    this.productService.getProductsShowcaseHttp(query)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.productPaginator = response
      });
  }

  changePageProps(event: PageChange) {
    this.paginator.page = event.page;
    this.paginator.limit = event.limit;
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

  verifyTypeParamSearch(params: Params){

    this.searchProperties.name = params['name'];

    if(params['subCategoryId']){
      this.searchProperties.valueSearch = { subCategoryId: params['subCategoryId'] };
    }

    if(params['product']){
      this.searchProperties.valueSearch = { name: params['product'] };
    }

    if(params['categoryId']){
      this.searchProperties.valueSearch = { categoryId: params['categoryId'] };
    }

    this.searchProductsShowcase();
  }
}

interface SearchProperties {
  name?: string;
  valueSearch?: { [key: string]: string };
}
