import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();
  constructor(public userService: UserService) { }
  ngOnInit(): void {}
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  logout(): void {
    this.userService.logout();
  }

  wrap(): void {
    this.onSidenavClose();
    this.logout();
  }

}
