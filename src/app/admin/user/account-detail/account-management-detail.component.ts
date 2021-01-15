import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AccountManagementService} from '../../../shared/services/account-management.service';
import {User} from '../../../shared/user.model';

@Component({
  selector: 'app-account-management-detail',
  templateUrl: './account-management-detail.component.html',
  styleUrls: ['./account-management-detail.component.css']
})
export class AccountManagementDetailComponent implements OnInit {
  user: User;
  id: number;

  constructor(private accountManagementService: AccountManagementService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.user = this.accountManagementService.getUser(this.id);
      }
    );
  }

}
