import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { Ingredient } from '@models/ingredient.model';
import { Recipe } from '@models/recipe.model';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'dav-cooks-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  recipeForm = this.fb.group({
    name: [''],
    description: [''],
    image: [''],
    cookTime: [''],
    prepTime: [''],
    yield: [''],
    ingredients: this.fb.array([]),
    steps: this.fb.array([]),
    tags: this.fb.array([]),
    originalURL: ['']
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RecipeEditComponent>,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
  }

  onSave() {
    // console.log(this.convertFormModel());
    this.recipeService.addRecipe(this.convertFormModel());
  }

  onCancel() {
    this.dialogRef.close();
  }

  private convertFormModel(): Recipe {

    let ing: Ingredient[] = [];
    this.ingredients.controls.forEach(c => {
      ing.push(c.value);
    });

    let steps: string[] = [];
    this.steps.controls.forEach(c => {
      steps.push(c.value);
    });

    let tags: string[] = [];
    this.tags.controls.forEach(c => {
      tags.push(c.value);
    });

    const r: Recipe = {
      name: this.recipeForm.get('name').value,
      cookTime: this.recipeForm.get('cookTime').value,
      prepTime: this.recipeForm.get('prepTime').value,
      yield: this.recipeForm.get('yield').value,
      description: this.recipeForm.get('description').value,
      image: this.recipeForm.get('image').value,
      originalURL: this.recipeForm.get('originalURL').value,
      ingredients: ing,
      steps: steps,
      tags: tags
    }
    return r;
  }

  get ingredients() { return this.recipeForm.get('ingredients') as FormArray; }
  get steps() { return this.recipeForm.get('steps') as FormArray; }
  get tags() { return this.recipeForm.get('tags') as FormArray; }

  addIngredient() {
    this.ingredients.push(this.fb.group({
      name: [''],
      quantity: [''],
      type: [''],
      note: [''],
      link: ['']
    }));
  }

  addStep() {
    this.steps.push(this.fb.control(''));
  }

  removeIngredient(i: number) {
    this.ingredients.removeAt(i);
  }

  removeStep(i: number) {
    this.steps.removeAt(i);
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(this.fb.control(value.trim()));
    }

    if (input) {
      input.value = '';
    }

  }

  removeTag(i: number) {
    this.tags.removeAt(i);
  }

}
