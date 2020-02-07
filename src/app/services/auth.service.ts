import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;
    // this.user.subscribe(
    //   (user) => {
    //     if (user) {
    //       this.userDetails = user;
    //       console.log(this.userDetails);
    //     }
    //     else {
    //       this.userDetails = null;
    //     }
    //   }
    // );
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  loginWithEmail(payload: { email: string, password: string }) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(payload.email, payload.password);
  }

  logout() {
    this.firebaseAuth.auth.signOut();
  }

}
