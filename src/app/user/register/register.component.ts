import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../userFormStyle.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('formGroup', {static: false}) formGroup: NgForm;
  regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const formValues = this.formGroup.form.value;
      console.log(formValues);
      if (this.regex.test(formValues.password) && formValues.password === formValues.passwordRepeat) {
        this.userService.register(formValues.personName, formValues.email, formValues.password).subscribe((body) => {
          this.router.navigate(['login']);
        });
      }
    }
  }
}
