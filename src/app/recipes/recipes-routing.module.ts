import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes.component';


const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    children: [
      {
        path: '',
        component: RecipeListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
