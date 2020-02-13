import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ImageEditComponent } from '../image-edit/image-edit.component';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'dav-cooks-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  recipeForm = this.fb.group({
    name: ['', Validators.required],
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
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RecipeEditComponent>,
    private snackBar: MatSnackBar,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
  }

  onSave() {
    if (this.recipeForm.invalid) {
      this.snackBar.open('Recipe is incomplete! Please provide values for the required fields.', 'DISMISS', {
        duration: 5000
      });
      return;
    }
    this.recipeService.addRecipe(this.recipeForm.value);
  }

  onCancel() {
    this.dialogRef.close();
  }

  get ingredients() { return this.recipeForm.get('ingredients') as FormArray; }
  get steps() { return this.recipeForm.get('steps') as FormArray; }
  get tags() { return this.recipeForm.get('tags') as FormArray; }
  get image() { return this.recipeForm.get('image') as FormControl; }

  addIngredient() {
    this.ingredients.push(this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required]
    }));
  }

  addImage() {
    const ref = this.dialog.open(ImageEditComponent, {
      data: { imageUrl: this.image.value },
      width: '350px'
    });

    ref.afterClosed().subscribe(result => {
      if (result) {
        if (result.changed && result.url) {
          this.recipeForm.patchValue({ image: result.url });
        }
      }
    });
  }

  addStep() {
    this.steps.push(this.fb.control('', [Validators.required]));
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

  removeIngredient(i: number) { this.ingredients.removeAt(i); }
  removeStep(i: number) { this.steps.removeAt(i); }
  removeTag(i: number) { this.tags.removeAt(i); }

  onStepKeydown(event) {
    if (event.key === "Enter") {
      this.addStep();
    }
  }

}
