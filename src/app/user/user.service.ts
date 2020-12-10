import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Router } from '@angular/router';
import {HttpErrorResponse, HttpParams} from '@angular/common/http';
import { User } from '../shared/user.model';
import {catchError} from 'rxjs/operators';
import {error} from 'util';


@Injectable({providedIn: 'root'})
export class UserService {
  currentUser: User = null;
  PREFIX = 'users';
  public redirectURL: string;

  constructor(private apiService: ApiService, private router: Router) {
    const currentUser = localStorage.getItem('user');
    if (currentUser !== null) {
      this.currentUser = JSON.parse(currentUser);
    }
  }

  login(email: string, password: string) {
    const response = this.apiService.post({
      endPoint: `/${this.PREFIX}/login`,
      body: new HttpParams()
        .set('email', email)
        .set('password', password)
    }, false);
    response.pipe(
      // catchError((error: HttpErrorResponse) => M.toast({html: `${error.error.message}`}))
    ).subscribe((data) => {
      this.currentUser = data.content;
      localStorage.setItem('user', JSON.stringify(this.currentUser));
      this.router.navigate(['home']);
    });
  }

  logout() {
    this.router.navigate(['login']);
    localStorage.removeItem('user');
    this.currentUser = null;
  }

  register(name: string, email: string, password: string)  {
    return this.apiService.post({
      endPoint: `/${this.PREFIX}/register`,
      body: new HttpParams()
        .set('name', name)
        .set('email', email)
        .set('password', password)
    }, false).pipe(
      // catchError((error) => M.toast({html: `${error.message}`}))
    );
  }

  isAuthorized() {
    if (this.currentUser !== null) {
      return this.currentUser.privilege > 0;
    }
  }

  isLoggedIn(): any {
    return this.currentUser !== null && localStorage.getItem('user') !== null;
  }

  setNewAuthToken(authToken: string) {
    this.currentUser.authToken = authToken;
    localStorage.setItem('user', JSON.stringify(this.currentUser));
  }

}
