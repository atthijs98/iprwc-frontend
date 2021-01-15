import {EventEmitter, Injectable} from '@angular/core';
import {Product} from '../models/product.model';
import {Observable, Subject, throwError} from 'rxjs';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {ProductDirector} from '../models/product-director.model';
import {ProductImage} from '../models/product-image.model';
import {HttpParams} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {ApiService} from '../shared/services/api.service';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class ProductService {
  productSelected = new EventEmitter<Product>();
  productsChanged = new Subject<Product[]>();
  PREFIX = 'products';

  private products: Product[] = [
    {id: 1, enTitle: 'Ran', orTitle: 'Ran', romOrTitle: '乱', runtime: '160',
      poster: 'https://s3.amazonaws.com/criterion-production/films/cf75c5b225b8892c55ed98276db4f5ce/MwHT6SDYJSbktYtorPE6MOO8mE3UtI_large.jpg',
      plot: 'With Ran, legendary director Akira Kurosawa reimagines Shakespeare\'s King Lear as a singular historical epic set in sixteenth-century Japan. Majestic in scope, the film is Kurosawa\'s late-life masterpiece, a profound examination of the folly of war and the crumbling of one family under the weight of betrayal, greed, and the insatiable thirst for power.',
      year: '1985', price: 39.95, trailer: 'https://www.youtube.com/watch?v=YwP_kXyd-Rw', createdAt: '15-01-2021'
    },
    {id: 2, enTitle: 'Her', orTitle: 'Her', romOrTitle: 'Her', runtime: '126',
      poster: 'https://m.media-amazon.com/images/M/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjEwMDE@._V1_UX182_CR0,0,182,268_AL_.jpg',
      plot: 'In the not so distant future, Theodore, a lonely writer purchases a newly developed operating system designed to meet the user’s every needs. To Theodore’s surprise, a romantic relationship develops between him and his operating system. This unconventional love story blends science fiction and romance in a sweet tale that explores the nature of love and the ways that technology isolates and connects us all.\n' +
        '\n',
      year: '2013', price: 20.00, trailer: 'https://www.youtube.com/watch?v=ne6p6MfLBxc', createdAt: '15-01-2021'
    },
    {id: 3, enTitle: 'La Haine', orTitle: 'La Haine', romOrTitle: 'La Haine', runtime: '98',
      poster: 'https://s3.amazonaws.com/criterion-production/films/726755430bd298a5aa424f68a792bcea/aQ0KQhoip19olkpwhmNbrAfMY6qhAB_large.jpg',
      plot: 'Mathieu Kassovitz took the film world by storm with La haine, a gritty, unsettling, and visually explosive look at the racial and cultural volatility in modern-day France, specifically the low-income banlieue districts on Paris’s outskirts. Aimlessly passing their days in the concrete environs of their dead-end suburbia, Vinz (Vincent Cassel), Hubert (Hubert Koundé), and Saïd (Saïd Taghmaoui)—a Jew, an African, and an Arab—give human faces to France’s immigrant populations, their bristling resentment at their marginalization slowly simmering until it reaches a climactic boiling point. A work of tough beauty, La haine is a landmark of contemporary French cinema and a gripping reflection of its country’s ongoing identity crisis.',
      year: '1995', price: 31.96, trailer: 'https://www.youtube.com/watch?v=FKwcXt3JIaU', createdAt: '15-01-2021'
    },
  ];

  constructor(private shoppingListService: ShoppingListService, private apiService: ApiService, private snackBar: MatSnackBar) {}

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

  deleteProduct(id: number): void {
    for (let i = 0; i < this.products.length; i++) {
      if (id === this.products[i].id) {
        this.products.splice(i, 1);
        this.productsChanged.next(this.products.slice());
      }
    }

    // return this.apiService.delete({
    //   endPoint: `/${this.PREFIX}/${id}`
    // }).pipe(
    //   catchError(async (err) => this.snackBar.open(err.error.message))
    // ).subscribe((data) => {
    //   this.snackBar.open(data.message, '', {
    //     duration: 3000
    //   });
    // });
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

  fetchProducts(): Observable<any> {
    return this.apiService.get({
      endPoint: `/${this.PREFIX}`, body: new HttpParams().set('Access-Control-Allow-Origin', '*')
    }).pipe(
      tap(products => {
        this.setProducts(products.content);
      }),
      catchError(this.handleError)
    );
  }

  handleError(error): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      if (error.error.status === 404) {
        errorMessage = `Not found`;
      }
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
