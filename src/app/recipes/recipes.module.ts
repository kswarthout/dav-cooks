import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ImageEditComponent } from './image-edit/image-edit.component';
import { IngredientEditComponent } from './ingredient-edit/ingredient-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
    IngredientEditComponent,
    ImageEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RecipesRoutingModule
  ],
  exports: [
    RecipeEditComponent
  ],
  entryComponents: [
    RecipeEditComponent,
    ImageEditComponent
  ]
})
export class RecipesModule { }
