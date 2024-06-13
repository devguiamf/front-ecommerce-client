import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {LocalStorageService, StorageKeys} from "../../@shared/services/local-storage.service";
import {CartItem} from "../shopping-cart.interface";
import { Product } from '../../products/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  listCartItems$: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  addCartItemToBehaviorList$(item: CartItem) {
    const currentValue = this.localStorageService.get(StorageKeys.cart_items) ?? [];
    const updatedValue = [...currentValue, item];
    this.listCartItems$.next(updatedValue);
    this.localStorageService.set(StorageKeys.cart_items, updatedValue);
  }

  addCartExistenceItemsToBehaviorList$(item: CartItem) {
    const updatedValue = this.listCartItems$.value.map(i => {
      if (i.productId === item.productId) {
        return {
          ...i,
          quantity: i.quantity + item.quantity
        }
      }
      return i;
    });
    this.listCartItems$.next(updatedValue);
    this.localStorageService.set(StorageKeys.cart_items, updatedValue);
    return;
  }

  verifyExistenceProductInCart(item: CartItem) {
    const currentValue = this.listCartItems$.value;
    const productExist = currentValue.find(i => i.productId === item.productId);
    if (productExist) {
      return productExist
    }
    return null;
  }

  removeCartItemFromBehaviorList$(productId: string) {
    const currentValue = this.localStorageService.get(StorageKeys.cart_items) ?? [];
    const updatedValue = currentValue.filter((item: any) => item.productId !== productId);
    this.listCartItems$.next(updatedValue);
    this.localStorageService.set(StorageKeys.cart_items, updatedValue);
  }

  getProductsRecomendation(): Observable<Product[]>{
    return of([
      {
        id: "1",
        name: "Os Segredos da Mente Milionária",
        description: "descrição",
        price: 109.90,
        category: {
          id: '1',
          name: 'Livros',
          rootCategory: {
              id: '1',
              name: 'Auto Ajuda',
              description: "descrição"
          }
        },
        image: "https://sextante.com.br/wp-content/uploads/2019/02/seglivro-destaque.png"
      },
      {
        id: "2",
        name: "Casais Inteligentes Enriquecem Juntos",
        description: "descrição",
        price: 85.00,
        category: {
          id: '1',
          name: 'Livros',
          rootCategory: {
              id: '1',
              name: 'Auto Ajuda',
              description: "descrição"
          }
        },
        image: "https://sextante.com.br/wp-content/uploads/2019/03/Casais-inteligentes-enriquecem-juntos-capa-livro.png"
      },
      {
        id: "3",
        name: "Me Poupe!: 10 passos para nunca mais faltar dinheiro no seu bolso",
        description: "descrição",
        price: 109.90,
        category: {
          id: '1',
          name: 'Livros',
          rootCategory: {
              id: '1',
              name: 'Auto Ajuda',
              description: "descrição"
          }
        },
        image: "https://images.tcdn.com.br/img/img_prod/812846/me_poupe_10_passos_para_nunca_mais_faltar_dinheiro_no_seu_bolso_979_1_f21a7701ab8cfbc711cbb58e6eecbf55_20220110093936.png"
      },
      {
        id: "4",
        name: "Sonho Grande, de Cristiane Corre",
        description: "descrição",
        price: 109.90,
        category: {
          id: '1',
          name: 'Livros',
          rootCategory: {
              id: '1',
              name: 'Auto Ajuda',
              description: "descrição"
          }
        },
        image: "https://alchetron.com/cdn/banco-garantia-7305f0c0-1593-40ad-aff9-58929c524bd-resize-750.jpg"
      },
      {
        id: "5",
        name: "Do mil ao milhão: Sem cortar o cafezinho",
        description: "descrição",
        price: 109.90,
        category: {
          id: '1',
          name: 'Livros',
          rootCategory: {
              id: '1',
              name: 'Auto Ajuda',
              description: "descrição"
          }
        },
        image: "https://images.tcdn.com.br/img/img_prod/812846/do_mil_ao_milhao_sem_cortar_o_cafezinho_923_1_be4770cb09af6e3e435a3191dbcebec2_20220110093831.png"
      }
    ])
  }
}

