import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/user.model';
import {AccountManagementService} from '../../shared/services/account-management.service';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {
  selectedUser: User;

  constructor(private accountManagementService: AccountManagementService) {
  }

  ngOnInit(): void {
    this.accountManagementService.userSelected.subscribe(
      (user: User) => {
        this.selectedUser = user;
      }
    );
  }
}
