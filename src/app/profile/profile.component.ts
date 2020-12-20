import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {User} from '../shared/user.model';
import {UserService} from '../user/user.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {passwordMatchValidator} from '../user/register/register.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: number;
  currentUser: User|null;
  regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/;

  changePasswordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
      Validators.pattern(this.regex)
    ]),
    repeatPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
      Validators.pattern(this.regex)
    ])
  }, {validators: passwordMatchValidator });

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.userId;
        if (!this.userService.parseAuthToken(this.id)) {
          this.router.navigate(['home']);
        } else {
          this.getUserData();
        }
      }
    );
  }

  get password(): AbstractControl {return this.changePasswordForm.get('password'); }
  get repeatPassword(): AbstractControl {return this.changePasswordForm.get('repeatPassword'); }

  onPasswordInput(): void {
    if (this.changePasswordForm.hasError('passwordMismatch')) {
      this.repeatPassword.setErrors([{passwordMismatch: true}]);
    } else {
      this.repeatPassword.setErrors(null);
    }
  }

  private getUserData(): void {
    this.currentUser = this.userService.currentUser;
  }

  onSubmit(): void {
    const values = this.changePasswordForm.value;

    if (this.changePasswordForm.valid) {
      this.userService.changeUserPassword(this.id, values.password);
      this.changePasswordForm.reset();
    }
  }
}
