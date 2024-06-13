import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../@shared/services/local-storage.service';

@Component({
  selector: 'app-account-menu',
  standalone: true,
  imports: [
    MatMenuModule,
    MatIcon
  ],
  templateUrl: './account-menu.component.html',
  styleUrl: './account-menu.component.scss'
})
export class AccountMenuComponent {
  accountOptions: AccountOptions[]

  constructor(
    private router: Router,
    private localStorage: LocalStorageService
  ){
    this.accountOptions = this.initialAcountOptions();
  }

  initialAcountOptions(): AccountOptions[] {
    return [
      {
        icon: 'account_circle',
        label: 'Minha conta'
      },
      {
        icon: 'shopping_cart',
        label: 'Meus pedidos',
        enabled: true
      },
      {
        icon: 'favorite',
        label: 'Favoritos',
      },
      {
        icon: 'exit_to_app',
        label: 'Sair',
        enabled: true
      }
    ]
  }

  selectAccountOption(option: AccountOptions) {
    if(!option.enabled) {
      return;
    }

    option.label == 'Sair' ? this.singOut() : this.goToMyOrders();
  }

  goToMyOrders() {
    return this.router.navigate(['/user-orders']);
  }

  singOut() {    
    this.localStorage.clear();
    return this.router.navigate(['/login']);
  }
}

interface AccountOptions {
  icon: string;
  label: string;
  enabled?: boolean;
}
