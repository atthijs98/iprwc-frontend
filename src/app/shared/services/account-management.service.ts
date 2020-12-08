import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {merge} from 'rxjs/operators';
import {HttpErrorResponse, HttpParams} from '@angular/common/http';
import {User} from '../user.model';
import {ApiService} from './api.service';
import {MatPaginator, MatSort} from '@angular/material';

@Injectable()
export class AccountManagementService {
  users: User[] = [];
  user: User;
  userObservable;
  PREFIX = 'users';


  constructor(private apiService: ApiService) {
  }

  setUserObservable() {
    this.userObservable = Observable.create(observer => {
      this.getUserObservable(observer);
    });
  }

  getUsers() {
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
}
