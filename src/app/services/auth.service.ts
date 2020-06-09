import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isSignedInStream: Observable<boolean>;
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;
    this.isSignedInStream = this.firebaseAuth.authState.pipe(
      map((user: firebase.User): boolean => {
        return user != null;
      })
    );
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
    return this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((result) => {
        console.log(result);
        this.router.navigate(['/dashboard']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      });
  }

  updateProfile(displayName: string, photoURL: string) {
    this.firebaseAuth.auth.currentUser
      .updateProfile({
        displayName: displayName,
        photoURL: photoURL
      })
      .then(() => {
        console.log('profile updated')
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
