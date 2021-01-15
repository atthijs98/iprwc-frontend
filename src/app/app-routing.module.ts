import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthenticatedGuard} from './shared/Authentication.guard';
import {ProfileComponent} from './profile/profile.component';
import {AdminComponent} from './admin/admin.component';
import {ProductManagementListComponent} from './admin/product/product-list/product-management-list.component';
import {ProductResolverService} from './shared/resolvers/product-resolver.service';
import {ProductManagementEditComponent} from './admin/product/product-edit/product-management-edit.component';
import {ProductManagementDetailComponent} from './admin/product/product-detail/product-management-detail.component';
import {ProductManagementStartComponent} from './admin/product/product-start/product-management-start.component';
import {ProductManagementComponent} from './admin/product/product-management.component';

const routes: Routes = [
  { path: 'profile/:userId', component: ProfileComponent, canActivate: [AuthenticatedGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthenticatedGuard]},
  {path: 'product-management', component: ProductManagementComponent, canActivate: [AuthenticatedGuard], resolve: [ProductResolverService], children: [
      {path: '', component: ProductManagementStartComponent },
      {path: 'new', component: ProductManagementEditComponent},
      {path: ':id', component: ProductManagementDetailComponent},
      {path: ':id/edit', component: ProductManagementEditComponent}
      ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
