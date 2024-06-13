import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const defaultTitle = 'Piá Commerce'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full'
  },
  { 
    path: 'shop', 
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule),
    title: defaultTitle
  },
  { 
    path: 'product/:category/:subcategory/:id', 
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
    title: defaultTitle
  },
  { 
    path: 'login', 
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule), 
    title: defaultTitle
  }, 
  { 
    path: 'signup', 
    loadChildren: () => import('./auth/signup/signup.module').then(m => m.SignupModule), 
    title: defaultTitle
  }, 
  {    
    path: 'checkout', 
    loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule), 
    title: defaultTitle
  },
  { 
    path: 'confirmation-signup', 
    loadChildren: () => import('./confirmation-signup/confirmation-signup.module').then(m => m.ConfirmationSignupModule),
    title: defaultTitle
  },
  { 
    path: 'shopping-cart', 
    loadChildren: () => import('./shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule) 
  },
  { 
    path: 'shop-search', 
    loadChildren: () => import('./shop-search/shop-search.module').then(m => m.ShopSearchModule) 
  },
  { 
    path: 'user-orders', 
    loadChildren: () => import('./user-orders/user-orders.module').then(m => m.UserOrdersModule)
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
