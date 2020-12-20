import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {User} from '../user.model';
import {ApiService} from '../services/api.service';
import {AccountManagementService} from '../services/account-management.service';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserResolverService implements Resolve<User[]> {
  constructor(private apiService: ApiService, private accountManagementService: AccountManagementService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const users = this.accountManagementService.getUsers();
    if (users.length === 0) {
      return this.accountManagementService.fetchUsers();
    } else {
      return users;
    }
  }
}
