import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../user/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  logout(): void {
    this.userService.logout();
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
