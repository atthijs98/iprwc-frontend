import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AccountListDataSource } from './account-list-datasource';
import {AccountManagementService} from '../shared/services/account-management.service';
import {User} from '../shared/user.model';
import {ApiService} from '../shared/services/api.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<User[]>;
  dataSource: AccountListDataSource;
  data: User[];
  private userSubscription;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['email', 'name', 'privilege', 'position'];

  constructor(private accountManagementService: AccountManagementService) {
  }

  ngOnInit() {
    this.accountManagementService.setUserObservable();
    this.userSubscription = this.accountManagementService.userObservable
      .subscribe((users) => {
        this.dataSource = new AccountListDataSource(users.content, this.paginator, this.sort);
      });
  }


  changeUserPrivilege(target, user) {
    console.log(target.value);
    console.log(user.id);
    // this.accountManagementService.changeUserPrivilege(user.id, target.value);
  }

  changeUserPosition(target, user) {
    //this.accountManagementService.setUserPosition(user.id, target.value);
  }

}
