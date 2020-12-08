import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../userFormStyle.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('formGroup', {static: false}) formGroup: NgForm;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (this.userService.currentUser !== null) {
      this.router.navigate(['home']);
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const formValues = this.formGroup.form.value;
      this.userService.login(formValues.email, formValues.password);
    }
  }
}
