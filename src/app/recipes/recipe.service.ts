import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Recipe } from '@models/recipe.model';
import { User } from '@models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private user: firebase.User;
  public userRecipes: Observable<Recipe[]>;

  constructor(
    private db: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth,
    private http: HttpClient
  ) {
    this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        this.userRecipes = this.db.list<Recipe>(`/users/${this.user.uid}/recipes`).valueChanges();
      }
    });
  }

  addRecipe(r: Recipe) {
    const recipe: Recipe = {
      ...r,
      author: this.user.displayName,
      datePublished: Date()
    }
    return this.db.database
      .ref(`/users/${this.user.uid}/recipes`)
      .push(recipe)
  }

  addUserRecipe(recipeId: string) {
    return this.db.database
      .ref(`/users/${this.user.uid}`)
      .child('recipes')
      .push(recipeId);
  }

  scrapeRecipeMetaData(url: string) {
    return this.http.post(`https://us-central1-dav-cooks-6405f.cloudfunctions.net/getRecipeMetaData`, { URL: url });
  }

}
