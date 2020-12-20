import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('password').value === formGroup.get('repeatPassword').value) {
    return null;
  } else {
    return {passwordMismatch: true};
  }
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../userFormStyle.css']
})
export class RegisterComponent implements OnInit {
  regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/;

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    email: new FormControl('', [Validators.email, Validators.required, Validators.maxLength(255)]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.regex), Validators.maxLength(255)]),
    repeatPassword: new FormControl('', [Validators.required, Validators.pattern(this.regex), Validators.maxLength(255)])
  }, {validators: passwordMatchValidator});

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  get password(): AbstractControl {return this.registerForm.get('password'); }
  get repeatPassword(): AbstractControl {return this.registerForm.get('repeatPassword'); }

  onPasswordInput(): void {
    if (this.registerForm.hasError('passwordMismatch')) {
      this.repeatPassword.setErrors([{passwordMismatch: true}]);
    } else {
      this.repeatPassword.setErrors(null);
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const values = this.registerForm.value;
      this.userService.register(values.name, values.email, values.password);
      this.router.navigate(['login']);
    }
  }
}
