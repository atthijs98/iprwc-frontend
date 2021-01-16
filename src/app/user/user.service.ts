import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Router } from '@angular/router';
import {HttpErrorResponse, HttpParams} from '@angular/common/http';
import { User } from '../shared/user.model';
import {catchError} from 'rxjs/operators';
import {error} from 'util';

import {MatSnackBar} from '@angular/material';
import {Observable, Subscription, throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
  currentUser: User = null;
  PREFIX = 'users';
  public redirectURL: string;

  constructor(private apiService: ApiService, private router: Router, private snackBar: MatSnackBar) {
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
      catchError(err => {
        this.snackBar.open(err.error.message);
        return throwError(err);
      })
    ).subscribe((data) => {
      this.currentUser = data.content;
      localStorage.setItem('user', JSON.stringify(this.currentUser));
      this.router.navigate(['home']);
    });
  }


  logout(): void {
    this.router.navigate(['login']);
    localStorage.removeItem('user');
    this.currentUser = null;
  }

  register(name: string, email: string, password: string): any  {
    return this.apiService.post({
      endPoint: `/${this.PREFIX}/register`,
      body: new HttpParams()
        .set('name', name)
        .set('email', email)
        .set('password', password)
    }, false).pipe(
      catchError(async (err) => this.snackBar.open(err.error.message))
    ).subscribe((data) => {
      this.snackBar.open(data.message, '', {
        duration: 3000
      });
    });
  }

  // tslint:disable-next-line:typedef
  changeUserPassword(userId: number, password: string) {
    return this.apiService.post({
      endPoint: `/${this.PREFIX}/password/` + userId,
      body: new HttpParams().set('password', password)
    }, false).pipe(
      catchError(async (err) => this.snackBar.open(err.error.message))
    ).subscribe((data) => {
      this.snackBar.open(data.message, '', {
        duration: 3000
      });
    });
  }

  // alterLanguage(jsonData: string): Promise<User> {
  //   return new Promise<User>(resolve => {
  //     this.apiService.postJSON({endPoint: `/${this.PREFIX}/language/alter`}, jsonData)
  //       .pipe(
  //         map(response => {
  //           return (response as any).content as User;
  //         })
  //       ).subscribe((p) => {
  //       this.currentUser.language = p.language;
  //       resolve();
  //     });
  //   });
  // }

  isAuthorized(): boolean {
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


  // tslint:disable-next-line:typedef
  parseAuthToken(id: number) {
    const token = JSON.parse(localStorage.getItem('user'));
    const t = token.authToken;
    const base64Url = t.split('.')[1];
    const base64 = base64Url.replace(/g/, '+').replace(/_/g, '/');
    const result = JSON.parse(window.atob(base64Url)).id;
    if (result === id) {
      return true;
    } else {
      return false;
    }
  }


}
