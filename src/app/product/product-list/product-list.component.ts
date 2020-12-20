import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../models/product.model';
import {Subscription} from 'rxjs';
import {ProductService} from '../product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {
    // fetchProducts
  }

  ngOnInit(): void {
    this.subscription = this.productService.productsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
    this.products = this.productService.getProducts();
  }

  onNewProduct() {
    this.router.navigate(['new'], { relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
