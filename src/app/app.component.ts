import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { User } from './models/user.model';
import { LoginWithEmailAction, UserState } from './state/user.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @Select(UserState.user) user$: Observable<User>;

  constructor(private store: Store) { }

  login() {
    this.store.dispatch(new LoginWithEmailAction({
      email: 'kari.swarthout@gmail.com',
      password: '123456'
    }));
  }

}
