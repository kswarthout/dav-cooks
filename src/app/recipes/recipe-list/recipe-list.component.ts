import { Component, OnInit } from '@angular/core';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'dav-cooks-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  constructor(public recipeService: RecipeService) { }

  ngOnInit(): void {
    // if (this.recipeService.userRecipes) {
    //   this.recipeService.userRecipes.valueChanges()
    //     .subscribe(snapshot => {
    //       const recipes = snapshot.values();
    //       console.log(recipes);
    //     })
    // }

  }

}
