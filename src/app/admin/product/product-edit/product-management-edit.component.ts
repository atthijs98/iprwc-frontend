import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductService} from '../../../product/product.service';
import {ApiService} from '../../../shared/services/api.service';

@Component({
  selector: 'app-product-management-edit',
  templateUrl: './product-management-edit.component.html',
  styleUrls: ['./product-management-edit.component.css']
})
export class ProductManagementEditComponent implements OnInit {
  id: number;
  editMode = false;
  productForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router,
              private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
        this.initForm();
      }
    );
  }

  private initForm(): void {
    let enTitle = '',
        orTitle = '',
        romOrTitle = '',
        runtime = '',
        poster = '',
        plot = '',
        year = '',
        price = 0.00,
        trailer = '';
      // directors = new FormArray([]),
      // images = new FormArray([]);

    if (this.editMode) {
      const product = this.productService.getProduct(this.id);
      enTitle = product.enTitle;
      orTitle = product.orTitle;
      romOrTitle = product.romOrTitle;
      runtime = product.runtime;
      poster = product.poster;
      plot = product.plot;
      year = product.year;
      price = product.price;
      trailer = product.trailer;
      // for (let director of product.directors) {
      //   directors.push(
      //     new FormGroup({
      //       id: new FormControl(director.id),
      //       name: new FormControl(director.name)
      //     })
      //   )
      // }
      // for (let image of product.images) {
      //   images.push(
      //     new FormGroup({
      //       id: new FormControl(image.id),
      //       path: new FormControl(image.path)
      //     })
      //   )
      // }
    }
    this.productForm = new FormGroup({
      en_title: new FormControl(enTitle, [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(1)
      ]),
      original_title: new FormControl(orTitle, [
        Validators.minLength(1),
        Validators.maxLength(255)
      ]),
      romanized_original_title: new FormControl(romOrTitle, [
        Validators.minLength(1),
        Validators.maxLength(255),
      ]),
      runtime: new FormControl(runtime, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(15)
      ]),
      poster: new FormControl(poster, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(255)
      ]),
      plot: new FormControl(plot, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(500)
      ]),
      year: new FormControl(year, [
        Validators.required
      ]),
      price: new FormControl(price, [
        Validators.required,
        Validators.min(0.01),
        Validators.max(999999.99)
      ]),
      trailer: new FormControl(trailer, [
        Validators.required,
        Validators.min(1),
        Validators.max(85)
      ]),
      // directors: directors,
      // images: images
    });
  }

  onSubmit(): void {
    if (this.editMode) {
      this.productService.updateProduct(this.id, this.productForm.value);
      // for (let director of this.directorsToBeDeleted) {
      //   this.httpService.deleteDirector(director);
      // }
      // for (let image of this.imagesToBeDeleted) {
      //   this.httpService.deleteImage(image);
      // }
    } else {
      this.productService.addProduct(this.productForm.value);
    }
    // this.imagesToBeDeleted = [];
    // this.directorsToBeDeleted = [];
  }

  onCancel(): void {
    // this.imagesToBeDeleted = [];
    // this.directorsToBeDeleted = [];
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  // get images() {
  //   return (<FormArray>this.productForm.get('images')).controls;
  // }
  //
  // get directors() {
  //   return (<FormArray>this.productForm.get('directors')).controls;
  // }
  //
  // onDeleteImage(index: number, id: number) {
  //   this.imagesToBeDeleted.push(id);
  //   (<FormArray>this.productForm.get('images')).removeAt(index);
  // }

  // onDeleteDirector(index: number, id: number) {
  //   this.directorsToBeDeleted.push(id);
  //   (<FormArray>this.productForm.get('directors')).removeAt(index);
  // }
  //
  // onAddImage() {
  //   (<FormArray>this.productForm.get('images')).push(
  //     new FormGroup({
  //       'path': new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
  //     })
  //   )
  // }
  //
  // onAddDirector() {
  //   (<FormArray>this.productForm.get('directors')).push(
  //     new FormGroup({
  //       'name': new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
  //     })
  //   )
  // }

}
