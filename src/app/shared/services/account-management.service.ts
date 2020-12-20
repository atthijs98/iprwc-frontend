import {Injectable} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {catchError, merge} from 'rxjs/operators';
import {HttpErrorResponse, HttpParams} from '@angular/common/http';
import {User} from '../user.model';
import {ApiService} from './api.service';
import {MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {resolve} from 'url';

@Injectable()
export class AccountManagementService {
  private users: User[] = [];
  user: User;
  userObservable;
  PREFIX = 'users';


  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
  }

  setUserObservable(): void {
    this.userObservable = Observable.create(observer => {
      this.getUserObservable(observer);
    });
  }

  getUsers(): User[] {
    return this.users.slice();
  }

  private getUserObservable(observer) {
    this.apiService.get({
      endPoint: `/${this.PREFIX}`, body: new HttpParams().set('Access-Control-Allow-Origin', '*')
    }).subscribe((users: User[]) => {
      this.users = users;
      observer.next(users);
    });
  }

  deleteUser(userId: number): Subscription {
    return this.apiService.delete( {
      endPoint: `/${this.PREFIX}/${userId}`
    }).pipe(
      catchError(async (err) => this.snackBar.open(err.error.message))
    ).subscribe((data) => {
      this.snackBar.open(data.message, '', {
        duration: 3000
      });
    });
  }

  getUserAccount(userId: number): Observable<any> {
    return Observable.create(observer => {
      this.apiService.get({
        endPoint: `/${this.PREFIX}/` + userId
      }).subscribe((responseData) => {
        observer.next(responseData);
      });
    });
  }

  getAllAccounts(): Observable<any> {
    return Observable.create(observer => {
      this.apiService.get({
        endPoint: `/${this.PREFIX}/`
      }).subscribe((responseData) => {
        observer.next(responseData);
      });
    });
  }

  changeUserPrivilege(userId: number, userPrivilege: number) {
    this.apiService.postJSON({
      endPoint: `/${this.PREFIX}/privilege/` + userId,
    }, JSON.stringify( { privilege: userPrivilege} ))
      .subscribe((responseData: User) => {
      });
  }

  setUserPosition(userId: number, userPosition: number) {
    this.apiService.postJSON({
      endPoint: `/${this.PREFIX}/position/` + userId,
    }, JSON.stringify( { position: userPosition} ))
      .subscribe((responseData: User) => {
      });
  }



  changeUserPassword(userId: number, password: string): Subscription {
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
}
