import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPRODUCTS } from '@core/models';
import { ProductsServiceM } from '@data/repository';
import { END_POINT } from '@shared/constants';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements ProductsServiceM {
  constructor(private http: HttpClient) {}
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(
      environment.API_BASE +
        END_POINT.LIST_PRODUCTS +
        END_POINT.BAR +
        END_POINT.LIST_CATEGORIES,
      { observe: 'body' }
    );
  }
  getProducts(): Observable<IPRODUCTS[]> {
    return this.http.get<IPRODUCTS[]>(
      environment.API_BASE + END_POINT.LIST_PRODUCTS,
      { observe: 'body' }
    );
  }
  createProduct(product: IPRODUCTS): Observable<IPRODUCTS> {
    return this.http.post<IPRODUCTS>(
      environment.API_BASE + END_POINT.LIST_PRODUCTS,
      product
    );
  }
  editProduct(product: IPRODUCTS): Observable<IPRODUCTS> {
    return this.http.put<IPRODUCTS>(
      environment.API_BASE + END_POINT.LIST_PRODUCTS + END_POINT.BAR + product.id,
      product
    );
  }
  deleteProduct(id: number): Observable<IPRODUCTS> {
    return this.http.delete<IPRODUCTS>(
      environment.API_BASE + END_POINT.LIST_PRODUCTS + END_POINT.BAR + id
    );
  }
}
