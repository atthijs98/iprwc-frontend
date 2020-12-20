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
import { AccountListComponent } from './account-list/account-list.component';
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
import { ProductEditComponent } from './product/product-edit/product-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccountListComponent,
    SidenavListComponent,
    AdminComponent,
    ProfileComponent,
    ProductComponent,
    ProductListComponent,
    ShoppingListComponent,
    ProductItemComponent,
    ProductDetailComponent,
    ProductEditComponent
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
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
