import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    // this.firebaseAuth.auth.onAuthStateChanged((user) => {
    //   console.log(user);
    //   if (user) {
    //     this.router.navigate(['/dashboard']);
    //   }
    // });
  }

}
