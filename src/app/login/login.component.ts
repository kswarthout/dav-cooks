import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

import { LoginWithEmailAction } from '../state/user.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('kari.swarthout@gmail.com', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('123456', [Validators.required]);

  constructor(private store: Store) { }

  ngOnInit() {
  }

  login() {
    this.store.dispatch(new LoginWithEmailAction({
      email: 'kari.swarthout@gmail.com',
      password: '123456'
    })).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    )
  }

}
