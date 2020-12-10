import { Routes } from '@angular/router';

import { LoginComponent } from '../user/login/login.component';
import {AccountListComponent} from '../account-list/account-list.component';


export const sharedRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'account-list', component: AccountListComponent }
];
