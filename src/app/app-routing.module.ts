import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthenticatedGuard} from './shared/Authentication.guard';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [{ path: 'profile/:userId', component: ProfileComponent, canActivate: [AuthenticatedGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
