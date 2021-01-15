import { Component, OnInit } from '@angular/core';
import {Product} from '../../../models/product.model';
import {ProductService} from '../../../product/product.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApiService} from '../../../shared/services/api.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-product-management-detail',
  templateUrl: './product-management-detail.component.html',
  styleUrls: ['./product-management-detail.component.css']
})
export class ProductManagementDetailComponent implements OnInit {
  product: Product;
  id: number;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private apiService: ApiService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.product = this.productService.getProduct(this.id);
      }
    );
  }

  toShoppingList(): void {
    this.productService.addToShoppingList(this.product);
  }

  onEditProduct(): void {
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }
  onDeleteProduct(id: number): void {
    this.productService.deleteProduct(id);
    this.router.navigate(['/product-management']);
  }

}
