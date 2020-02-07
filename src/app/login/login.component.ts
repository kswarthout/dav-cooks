import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('kari.swarthout@gmail.com', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('123456', [Validators.required]);

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.auth.loginWithEmail({
      email: 'kari.swarthout@gmail.com',
      password: '123456'
    });
  }

}
