import { InjectionToken } from '@angular/core';
import { IPRODUCTS } from '@core/models';
import { Observable } from 'rxjs';

export const PRODUCTS_SERVICEM = new InjectionToken<ProductsServiceM>(
  'products.service'
);

export interface ProductsServiceM {
  getCategories(): Observable<string[]>;
  getProducts(): Observable<IPRODUCTS[]>;
  createProduct(product: IPRODUCTS): Observable<IPRODUCTS>;
  editProduct(product: IPRODUCTS): Observable<IPRODUCTS>;
  deleteProduct(id: number): Observable<IPRODUCTS>;
}
