import { Component, Input } from '@angular/core';
import {Router, RouterLink} from '@angular/router';

import { MatIcon } from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { AccountMenuComponent } from '../account-menu/account-menu.component';
import { UserLoggeed } from '../../@shared/interfaces/user.interface';
import { CategoryMenuOptions, RootCategoriesService } from '../../@shared/services/root-categories.service';
import {ShoppingCartService} from "../../shopping-cart/service/shopping-cart.service";
import {take} from "rxjs";
import {LocalStorageService, StorageKeys} from "../../@shared/services/local-storage.service";
import {FormsModule} from "@angular/forms";




@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
  imports: [
    RouterLink,
    MatIcon,
    MatBadgeModule,
    MatMenuModule,
    AccountMenuComponent,
    FormsModule
  ]
})
export class HeaderComponent {

  @Input({required: true}) userLogged: UserLoggeed | null = null;
  @Input() showSubNav: boolean = true;
  @Input() categoryMenuOptions: CategoryMenuOptions[] = [];

  searchString: string = '';
  badge: string = '0';

  constructor(
    private localStorage: LocalStorageService,
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) {
    this.observeShoppingCart();
    this.getShoppingCartItems();
  }

  observeShoppingCart(){
    this.shoppingCartService.listCartItems$
      .subscribe({
        next: (cart) => {
          this.badge = cart.length.toString();
        }
      })
  };

  getShoppingCartItems(){
    this.badge = this.localStorage.get(StorageKeys.cart_items)?.length.toString() ?? '0';
  }

  async goToCart(){
    if(!this.userLogged){
      await this.router.navigate(['/shopping-cart'], {queryParams: {from: this.router.url}});
      return;
    }
    await this.router.navigate(['/shopping-cart']);
  }

  async searchProductsBySubCategory(subCategory: any){
    await this.router.navigate(['/shop-search'], {
      queryParams: {
        name: subCategory.name,
        subCategoryId: subCategory.id
      }
    });
  }

  async onEnterSearch(){
    if(this.searchString){
      await this.router.navigate(['/shop-search'], {
        queryParams: {
          product: this.searchString,
          name: this.searchString
        }
      });
      return;
    }

    await this.router.navigate(['/shop-search']);
  }
}
