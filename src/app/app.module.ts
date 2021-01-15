import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MaterialModule } from './material/material.module';
import { environment } from '../environments/environment';
import {UserModule} from './user/user.module';
import { HeaderComponent } from './navigation/header/header.component';
import {SharedModule} from './shared/shared.module';
import {ResponseInterceptor} from './shared/response.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticationInterceptor} from './shared/authentication.interceptor';
import { AccountListComponent } from './admin/user/account-list/account-list.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ProductComponent } from './product/product.component';
import {MatGridListModule} from '@angular/material';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ProductItemComponent } from './product/product-list/product-item/product-item.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import {ApiService} from './shared/services/api.service';
import {AccountManagementService} from './shared/services/account-management.service';
import {ProductManagementListComponent} from './admin/product/product-list/product-management-list.component';
import {ProductService} from './product/product.service';
import {ShoppingListService} from './shopping-list/shopping-list.service';
import {ProductManagementComponent} from './admin/product/product-management.component';
import {ProductManagementEditComponent} from './admin/product/product-edit/product-management-edit.component';
import {ProductManagementDetailComponent} from './admin/product/product-detail/product-management-detail.component';
import { ProductManagementStartComponent } from './admin/product/product-start/product-management-start.component';
import {AccountManagementComponent} from './admin/user/account-management.component';
import {AccountManagementStartComponent} from './admin/user/account-start/account-management-start.component';
import {AccountManagementDetailComponent} from './admin/user/account-detail/account-management-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccountListComponent,
    ProductManagementListComponent,
    SidenavListComponent,
    AdminComponent,
    ProfileComponent,
    ProductComponent,
    ProductListComponent,
    ShoppingListComponent,
    ProductItemComponent,
    ProductDetailComponent,
    ProductManagementEditComponent,
    ProductManagementDetailComponent,
    ProductManagementComponent,
    ProductManagementStartComponent,
    AccountManagementComponent,
    AccountManagementDetailComponent,
    AccountManagementStartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    UserModule,
    MaterialModule,
    ReactiveFormsModule,
    MatGridListModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
    ApiService,
    AccountManagementService,
    ProductService,
    ShoppingListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
