import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Recipe } from '@models/recipe.model';
import { User } from '@models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private user: firebase.User;
  public userRecipes: Observable<Recipe[]>;
  public recipes: AngularFireList<Recipe>;
  public userRecipesList: AngularFireList<string>;
  public dbUser: AngularFireObject<User>;
  public userRecipes$: Observable<Recipe[]>;
  userRef: firebase.database.Reference;
  recipesRef: firebase.database.Reference;

  constructor(private db: AngularFireDatabase, private firebaseAuth: AngularFireAuth, private http: HttpClient) {
    this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        this.userRecipes = this.db.list<Recipe>(`/users/${this.user.uid}/recipes`).valueChanges();
        // this.userRef = this.db.database.ref(`/users/${this.user.uid}`);
        // this.userRecipesList = this.db.list(`/users/${this.user.uid}/recipes`);
        // this.userRecipesList.snapshotChanges().subscribe(snapshot => {
        //   snapshot.forEach(id => this.userRecipes.push(id.key));
        //   console.log(this.userRecipes);
        //   this.userRecipes.forEach(id => {
        //     this.db.database.ref('/recipes').equalTo(id).on('value', (snapshot) => {
        //       snapshot.forEach(r => {
        //         console.log(r);
        //       })
        //     })
        //   })
        // });

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
    // .then((result: firebase.database.Reference) => {
    //   const recipeId = result.key;
    //   // return this.addUserRecipe(recipeId);
    // }).catch((err) => {
    //   console.log(err);
    //   return null;
    // });
  }

  addUserRecipe(recipeId: string) {
    return this.db.database
      .ref(`/users/${this.user.uid}`)
      .child('recipes')
      .push(recipeId);
  }

  scrapeRecipe(url: string) {
    this.http.post(`http://localhost:5001/dav-cooks-6405f/us-central1/getRecipe`, { URL: url })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      )
  }

}
