import {EventEmitter, Injectable} from '@angular/core';
import {Product} from '../models/product.model';
import {Subject} from 'rxjs';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class ProductService {
  productSelected = new EventEmitter<Product>();
  productsChanged = new Subject<Product[]>();

  private products: Product[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  setProducts(products: Product[]) {
    this.products = products;
    this.productsChanged.next(this.products.slice());
  }

  getProducts() {
    return this.products.slice();
  }

  addToShoppingList(product: Product) {
    this.shoppingListService.addProduct(product);
  }
  getProduct(id:number) {
    for(let i = 0; i < this.products.length; i++) {
      if (id == this.products[i]['id']) {
        return this.products[i];
      }
    }
  }

  deleteProduct(id: number) {
    for (let i = 0; i < this.products.length; i++) {
      if (id == this.products[i]['id']) {
        this.products.splice(i, 1);
        this.productsChanged.next(this.products.slice());
      }
    }
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.productsChanged.next(this.products.slice());
  }

  updateProduct(id: number, newProduct: Product) {
    for (let i = 0; i < this.products.length; i++) {
      if (id == this.products[i]['id']) {
        this.products[i] = newProduct;
        this.productsChanged.next(this.products.slice());
      }
    }
  }
}
