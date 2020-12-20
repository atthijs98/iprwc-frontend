import { Routes } from '@angular/router';

import { LoginComponent } from '../user/login/login.component';
import {AccountListComponent} from '../account-list/account-list.component';
import {UserResolverService} from './resolvers/user-resolver.service';
import {NgModule} from '@angular/core';

// @ts-ignore
@NgModule({
  providers: [UserResolverService]
})
export const sharedRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'account-list', component: AccountListComponent, resolve: [UserResolverService] }
];
