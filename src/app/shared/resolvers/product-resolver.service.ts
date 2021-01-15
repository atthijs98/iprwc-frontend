import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ApiService} from '../services/api.service';
import {Observable} from 'rxjs';
import {Product} from '../../models/product.model';
import {ProductService} from '../../product/product.service';
import {map, take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ProductResolverService implements Resolve<Product[]> {
  constructor(private apiService: ApiService, private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const products = this.productService.getProducts();
    if (products.length === 0) {
      return this.productService.fetchProducts().pipe(take(1), map((product: Product) => product));
    } else {
      // @ts-ignore
      return products;
    }
  }
}
