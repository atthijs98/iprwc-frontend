import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AccountListDataSource } from './account-list-datasource';
import {AccountManagementService} from '../shared/services/account-management.service';
import {User} from '../shared/user.model';
import {UserService} from '../user/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  currentUser: User;
  users: User[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<User[]>;
  dataSource: AccountListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['email', 'name', 'privilege', 'action'];

  constructor(private accountManagementService: AccountManagementService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
    this.subscription = this.accountManagementService.usersChanged.subscribe(
      (users: User[]) => {
        this.users = users;
        this.dataSource = new AccountListDataSource(users, this.paginator, this.sort);
      }
    );
    this.users = this.accountManagementService.getUsers();
    this.dataSource = new AccountListDataSource(this.users, this.paginator, this.sort);
  }

  changeUserPrivilege(target, user): void {
    const newUser = user;
    newUser.privilege = target.value;
    this.accountManagementService.changeUserPrivilege(user.id, target.value, newUser);
  }


  deleteUser(id): void {
    this.accountManagementService.deleteUser(id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
