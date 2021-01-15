import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../models/product.model';
import {ProductService} from '../../product/product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  selectedProduct: Product;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit(): void {
    this.productService.productSelected.subscribe(
      (product: Product) => {
        this.selectedProduct = product;
      }
    );
  }

  newProduct() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }


}
