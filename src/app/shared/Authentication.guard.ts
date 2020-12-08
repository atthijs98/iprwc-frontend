import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../user/user.service';

@Injectable({providedIn: 'root'})
export class AuthenticatedGuard implements CanActivate, CanActivateChild {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if ((route.routeConfig.path === 'register' || route.routeConfig.path === 'login') && this.userService.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    } else if ((route.routeConfig.path === 'register' || route.routeConfig.path === 'login') && !this.userService.isLoggedIn()) {
      return true;
    } else if (this.userService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }

}
