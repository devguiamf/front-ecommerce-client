import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class RootCategoriesService {

  categoryList$ : BehaviorSubject<any[]> = new BehaviorSubject<any[]>([
    {
      id: 1,
      name: 'Category 1',
      subCategories: [
        {
          id: 1,
          name: 'SubCategory 1'
        },
        {
          id: 2,
          name: 'SubCategory 2'
        }
      ]
    },
    {
      id: 2,
      name: 'Category 2',
      subCategories: [
        {
          id: 1,
          name: 'SubCategory 1'
        },
        {
          id: 2,
          name: 'SubCategory 2'
        }
      ]
    },
    {
      id: 3,
      name: 'Category 3',
      subCategories: [
        {
          id: 1,
          name: 'SubCategory 1'
        },
        {
          id: 2,
          name: 'SubCategory 2'
        }
      ]
    },
    {
      id: 4,
      name: 'Category 4',
      subCategories: [
        {
          id: 1,
          name: 'SubCategory 1'
        },
        {
          id: 2,
          name: 'SubCategory 2'
        }
      ]
    },
    {
      id: 5,
      name: 'Category 5',
      subCategories: [
        {
          id: 1,
          name: 'SubCategory 1'
        },
        {
          id: 2,
          name: 'SubCategory 2'
        }
      ]
    }
  ]);

  constructor(
    private http: HttpClient
  ) { }

  getCategoriesHttp(): Observable<ShowCaseCategoriesResponse>{
    return this.http.get<ShowCaseCategoriesResponse>(`${environment.api}/showcase/categories`)
  }
}

export interface CategoryMenuOptions {
  id: string,
  name: string,
  description: string,
  subCategories: [
    {
      id: string,
      name: string,
      description: string
    }
  ]
}

interface ShowCaseCategoriesResponse{
  items: [
    {
      id: string,
      name: string,
      description: string,
      subCategories: [
        {
          id: string,
          name: string,
          description: string
        }
      ]
    }
  ]
}
