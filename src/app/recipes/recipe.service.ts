import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Recipe } from '@models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipes: AngularFireList<Recipe>;
  user: firebase.User;

  constructor(private db: AngularFireDatabase, private firebaseAuth: AngularFireAuth) {
    this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
    this.recipes = this.db.list('/recipes');
  }

  addRecipe(r: Recipe) {
    const recipe: Recipe = {
      ...r,
      author: this.user.displayName,
      datePublished: Date()
    }
    this.db.database
      .ref('/recipes')
      .push(recipe)
      .then((result: firebase.database.Reference) => {
        const recipeId = result.key;
        // console.log(recipeId);
        this.db.database
          .ref(`/users/${this.user.uid}`)
          .child('recipes')
          .push(recipeId)
          .then((result) => {
            // console.log(result);
          }).catch((err) => {
            // console.log(err);
          })
      }).catch((err) => {
        console.log(err);
      });
  }

}
