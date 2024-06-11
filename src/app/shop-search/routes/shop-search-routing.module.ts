import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopSearchComponent } from '../page/shop-search.component';

const routes: Routes = [{ path: '', component: ShopSearchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopSearchRoutingModule { }
