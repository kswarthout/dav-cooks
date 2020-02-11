import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private storage: AngularFireStorage) { }

  getAvatarUrl(uid: string) {
    this.storage
      .ref(`avatars/${uid}.png`)
      .getDownloadURL()
      .subscribe(url => console.log(url));
  }

  uploadAvatar(event, uid) {
    this.storage.upload(`/avatars/${uid}`, event.target.files[0]);
  }
}
