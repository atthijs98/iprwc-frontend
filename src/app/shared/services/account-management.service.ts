import {Injectable} from '@angular/core';
import {Observable, Subject, Subscription, throwError} from 'rxjs';
import {catchError, map, merge, tap} from 'rxjs/operators';
import {HttpErrorResponse, HttpParams} from '@angular/common/http';
import {User} from '../user.model';
import {ApiService} from './api.service';
import {MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {resolve} from 'url';

@Injectable()
export class AccountManagementService {
  usersChanged = new Subject<User[]>();
  PREFIX = 'users';

  private users: User[] = [];

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
  }

  setUsers(users: User[]): void {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  getUsers(): User[] {
    return this.users.slice();
  }

  getUser(id: number): User {
    for (let i = 0; i < this.users.length; i++) {
      if (id === this.users[i]['id']) {
        return this.users[i];
      }
    }
  }

  deleteUser(id: number): Subscription {
    for (let i = 0; i < this.users.length; i++) {
      if (id === this.users[i]['id']) {
        this.users.splice(i, 1);
        this.usersChanged.next(this.users.slice());
      }
    }

    return this.apiService.delete({
      endPoint: `/${this.PREFIX}/${id}`
    }).pipe(
      catchError(async (err) => this.snackBar.open(err.error.message))
    ).subscribe((data) => {
      this.snackBar.open(data.message, '', {
        duration: 3000
      });
    });

  }

  fetchUsers(): Observable<any> {
    return this.apiService.get({
      endPoint: `/${this.PREFIX}`, body: new HttpParams().set('Access-Control-Allow-Origin', '*')
    }).pipe(
      tap(users => {
        this.setUsers(users.content);
      }),
      catchError(this.handleError)
    );
  }

  handleError(error): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      if (error.error.status === 404) {
        errorMessage = `Not found`;
      }
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  updateUser(user): void {
    for (let i = 0; i < this.users.length; i++) {
      if (user.id === this.users[i]['id']) {
        this.users[i] = user;
        this.usersChanged.next(this.users.slice());
      }
    }
  }

  changeUserPrivilege(userId: number, userPrivilege: number, newUser: User): Subscription {
   return this.apiService.postJSON({
      endPoint: `/${this.PREFIX}/privilege/` + userId,
    }, JSON.stringify({privilege: userPrivilege})).pipe(
      catchError(async (err) => this.snackBar.open(err.error.message))
    ).subscribe((data) => {
        this.updateUser(newUser);
        this.snackBar.open(data.message, '', {
          duration: 3000
        });
      });
  }

  // private users: User[] = [];
  // user: User;
  // userObservable;
  // PREFIX = 'users';
  //
  //
  // constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
  // }
  //
  // setUserObservable(): void {
  //   this.userObservable = Observable.create(observer => {
  //     this.getUserObservable(observer);
  //   });
  // }
  //
  // getUsers(): User[] {
  //   return this.users.slice();
  // }
  //
  // private getUserObservable(observer) {
  //   this.apiService.get({
  //     endPoint: `/${this.PREFIX}`, body: new HttpParams().set('Access-Control-Allow-Origin', '*')
  //   }).subscribe((users: User[]) => {
  //     this.users = users;
  //     observer.next(users);
  //   });
  // }
  //
  // deleteUser(userId: number): Subscription {
  //   return this.apiService.delete( {
  //     endPoint: `/${this.PREFIX}/${userId}`
  //   }).pipe(
  //     catchError(async (err) => this.snackBar.open(err.error.message))
  //   ).subscribe((data) => {
  //     this.snackBar.open(data.message, '', {
  //       duration: 3000
  //     });
  //   });
  // }
  //
  // getUserAccount(userId: number): Observable<any> {
  //   return Observable.create(observer => {
  //     this.apiService.get({
  //       endPoint: `/${this.PREFIX}/` + userId
  //     }).subscribe((responseData) => {
  //       observer.next(responseData);
  //     });
  //   });
  // }
  //
  // getAllAccounts(): Observable<any> {
  //   return Observable.create(observer => {
  //     this.apiService.get({
  //       endPoint: `/${this.PREFIX}/`
  //     }).subscribe((responseData) => {
  //       observer.next(responseData);
  //     });
  //   });
  // }
  //
  // changeUserPrivilege(userId: number, userPrivilege: number) {
  //   this.apiService.postJSON({
  //     endPoint: `/${this.PREFIX}/privilege/` + userId,
  //   }, JSON.stringify( { privilege: userPrivilege} ))
  //     .subscribe((responseData: User) => {
  //     });
  // }
  //
  // setUserPosition(userId: number, userPosition: number) {
  //   this.apiService.postJSON({
  //     endPoint: `/${this.PREFIX}/position/` + userId,
  //   }, JSON.stringify( { position: userPosition} ))
  //     .subscribe((responseData: User) => {
  //     });
  // }
  //
  //
  //
  // changeUserPassword(userId: number, password: string): Subscription {
  //   return this.apiService.post({
  //     endPoint: `/${this.PREFIX}/password/` + userId,
  //     body: new HttpParams().set('password', password)
  //   }, false).pipe(
  //     catchError(async (err) => this.snackBar.open(err.error.message))
  //   ).subscribe((data) => {
  //     this.snackBar.open(data.message, '', {
  //       duration: 3000
  //     });
  //   });
  // }

}
