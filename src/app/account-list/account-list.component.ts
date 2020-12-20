import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AccountListDataSource } from './account-list-datasource';
import {AccountManagementService} from '../shared/services/account-management.service';
import {User} from '../shared/user.model';
import {ApiService} from '../shared/services/api.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {passwordMatchValidator} from '../user/register/register.component';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<User[]>;
  dataSource: AccountListDataSource;
  data: User[];
  private userSubscription;
  currentUser: User;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['email', 'name', 'privilege', 'action'];

  constructor(private accountManagementService: AccountManagementService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
    this.accountManagementService.setUserObservable();
    this.userSubscription = this.accountManagementService.userObservable
      .subscribe((users) => {
        this.dataSource = new AccountListDataSource(users.content, this.paginator, this.sort);
      });
  }


  changeUserPrivilege(target, user): void {
    console.log(target.value);
    console.log(user.id);
    // this.accountManagementService.changeUserPrivilege(user.id, target.value);
  }


  deleteUser(id): void {
    this.accountManagementService.deleteUser(id);
    const index = this.dataSource.data.indexOf(id);
    this.dataSource.data.splice(index, 1);
    this.table.renderRows();
    // this.dataSource._updateChangeSubscription();
  }

  // refresh(): void {
  //   this.accountManagementService.userObservable
  // }
}
