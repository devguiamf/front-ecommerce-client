import { Injectable } from '@angular/core';
import {Product, ProductPage} from '../product.interface';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import {LocalStorageService, StorageKeys} from "../../@shared/services/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpHeaders: HttpHeaders

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.get(StorageKeys.user_logged_token)}`
    });
  }

  getProductDetailsHttp(id: string): Observable<Product>{
    // return this.http.get<ProductPage>(`${environment.api}/products/${id}`);
    return of({
      id: "32a4b3c2-1b1b-4b3b-8b3b-1b1b1b1b1b1b",
      name: "Celular Samsung Galaxy S21 Ultra 5G 256GB - Preto",
      description: "O Samsung Galaxy S21 Ultra 5G é um smartphone Android avançado e abrangente em todos os pontos de vista com algumas características excelentes. Tem uma grande tela de 6.8 polegadas com uma resolução de 3200x1440 pixels. As funcionalidades oferecidas pelo Samsung Galaxy S21 Ultra 5G são muitas e inovadoras. Começando pelo LTE 5G que permite a transferência de dados e excelente navegação na internet. Enfatizamos a excelente memória interna de 256 GB mas sem a possibilidade de expansão.",
      price: 7999.99,
      category: {
        id: "32a4b3c2-1b1b-4b3b-8b3b-1b1b1b1b1b1b",
        name: "Celulares",
        rootCategory: {
          id: "32a4b3c2-1b1b-4b3b-8b3b-1b1b1b1b1b1b",
          name: "Eletrônicos",
          description: "Eletrônicos em geral"
        }
      },
      image: "https://th.bing.com/th/id/R.6545e95eb08939243d92676f0e848ed8?rik=vHBZ7ESaJow4qQ&pid=ImgRaw&r=0"
    })
  }

  getProductsShowcaseHttp(query: string): Observable<ProductPage>{
    return this.http.get<ProductPage>(`${environment.api}/showcase/products${query}`);
  }
}
