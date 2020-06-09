import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // FOR TESTING
  test_email: string = 'rick_sanchez@testuser.com';
  test_pass: string = '123456'
  emailFormControl = new FormControl(this.test_email, [Validators.required, Validators.email]);
  passwordFormControl = new FormControl(this.test_pass, [Validators.required]);

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.auth.loginWithEmail({
      email: this.test_email,
      password: this.test_pass
    });
  }

}
