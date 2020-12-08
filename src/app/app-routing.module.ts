import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AccountListComponent} from './account-list/account-list.component';

const routes: Routes = [{ path: 'account-list', component: AccountListComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
