import { Routes } from '@angular/router';

import { LoginComponent } from '../user/login/login.component';
import {AccountListComponent} from '../admin/user/account-list/account-list.component';
import {UserResolverService} from './resolvers/user-resolver.service';
import {NgModule} from '@angular/core';
import {AccountManagementComponent} from '../admin/user/account-management.component';
import {AccountManagementDetailComponent} from '../admin/user/account-detail/account-management-detail.component';
import {AccountManagementStartComponent} from '../admin/user/account-start/account-management-start.component';

// @ts-ignore
@NgModule({
  providers: [UserResolverService]
})
export const sharedRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'account-management', component: AccountManagementComponent, resolve: [UserResolverService], children: [
      {path: '', component: AccountManagementStartComponent},
      {path: ':id', component: AccountManagementDetailComponent}
    ]}
];
