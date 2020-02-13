import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  uploadRecipeImage(event): AngularFireUploadTask {
    const randomId = Math.random().toString(36).substring(2);
    return this.storage.upload(`/recipe/img/${randomId}`, event.target.files[0]);
  }

}
