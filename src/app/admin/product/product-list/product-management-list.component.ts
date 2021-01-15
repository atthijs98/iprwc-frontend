import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {Subscription} from 'rxjs';
import {ProductManagementListDatasource} from './product-management-list.datasource';
import {Product} from '../../../models/product.model';
import {ProductService} from '../../../product/product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-management-list',
  templateUrl: './product-management-list.component.html',
  styleUrls: ['./product-management-list.component.css']
})
export class ProductManagementListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  products: Product[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<Product[]>;
  dataSource: ProductManagementListDatasource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['poster', 'enTitle', 'year', 'details', 'action'];

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.productService.productsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
        this.dataSource = new ProductManagementListDatasource(products, this.paginator, this.sort);
      }
    );
    this.products = this.productService.getProducts();
    this.dataSource = new ProductManagementListDatasource(this.products, this.paginator, this.sort);
  }

  deleteProduct(id): void {
    this.productService.deleteProduct(id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
