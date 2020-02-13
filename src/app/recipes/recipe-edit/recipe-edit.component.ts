import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ingredient } from '@models/ingredient.model';
import { Recipe } from '@models/recipe.model';
import { takeUntil } from 'rxjs/operators';
import { BaseUnsubscribeComponent } from 'src/app/shared/base-unsubscribe/base-unsubscribe.component';
import { ChangesNotSavedComponent } from 'src/app/shared/changes-not-saved/changes-not-saved.component';

import { ImageEditComponent } from '../image-edit/image-edit.component';
import { OrigUrlEditComponent } from '../orig-url-edit/orig-url-edit.component';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'dav-cooks-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent extends BaseUnsubscribeComponent implements OnInit {

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  isSaving: boolean = false;
  isChanged: boolean = false;
  initialAboutState: any;
  initialIngredientState: Ingredient[];
  initialStepsState: string[];
  // recipeForm = this.fb.group({
  //   name: ['', Validators.required],
  //   description: [''],
  //   image: [''],
  //   cookTime: [''],
  //   prepTime: [''],
  //   yield: [''],
  //   ingredients: this.fb.array([]),
  //   steps: this.fb.array([]),
  //   tags: this.fb.array([]),
  //   originalURL: ['']
  // });

  aboutFormGroup = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    cookTime: [''],
    prepTime: [''],
    yield: [''],
    originalURL: [''],
    tags: this.fb.array([]),
    image: [''],
  });

  ingrdientsFormGroup = this.fb.group({
    ingredients: this.fb.array([])
  });

  stepsFormGroup = this.fb.group({
    steps: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RecipeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Recipe,
    private snackBar: MatSnackBar,
    private recipeService: RecipeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.aboutFormGroup.patchValue({
      name: this.data ? this.data.name : '',
      description: this.data ? this.data.description : '',
      image: this.data ? this.data.image : '',
      cookTime: this.data ? this.data.cookTime : '',
      prepTime: this.data ? this.data.prepTime : '',
      yield: this.data ? this.data.yield : '',
      tags: this.data ? this.data.tags : [],
      originalURL: this.data ? this.data.originalURL : ''
    });

    this.ingrdientsFormGroup.patchValue({
      ingredients: this.data ? this.data.ingredients : [],
    });

    this.stepsFormGroup.patchValue({
      steps: this.data ? this.data.steps : [],
    });

    this.initialAboutState = this.aboutFormGroup.value;
    this.initialIngredientState = this.ingrdientsFormGroup.value;
    this.initialStepsState = this.stepsFormGroup.value;

    this.aboutFormGroup.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(changes => {
        this.isChanged = this.compareAbout(changes);
      });

    this.ingrdientsFormGroup.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(changes => {
        this.isChanged = JSON.stringify(this.initialIngredientState) !== JSON.stringify(changes);
      });

    this.stepsFormGroup.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(changes => {
        this.isChanged = JSON.stringify(this.initialStepsState) !== JSON.stringify(changes);
      });
  }

  onSave() {
    if (this.aboutFormGroup.invalid || this.ingrdientsFormGroup.invalid || this.stepsFormGroup.invalid) {
      this.snackBar.open('Recipe is incomplete! Please provide values for the required fields.', 'DISMISS', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }
    this.isSaving = true;
    this.aboutFormGroup.disable();
    this.ingrdientsFormGroup.disable();
    this.stepsFormGroup.disable();

    const recipe: Recipe = {
      name: this.aboutFormGroup.get('name').value,
      description: this.aboutFormGroup.get('description').value,
      cookTime: this.aboutFormGroup.get('cookTime').value,
      prepTime: this.aboutFormGroup.get('prepTime').value,
      yield: this.aboutFormGroup.get('yield').value,
      tags: this.aboutFormGroup.get('tags').value,
      image: this.aboutFormGroup.get('image').value,
      originalURL: this.aboutFormGroup.get('originalURL').value,
      ingredients: this.ingrdientsFormGroup.value,
      steps: this.stepsFormGroup.value
    };

    this.recipeService.addRecipe(recipe)
      .then(result => {
        this.aboutFormGroup.enable();
        this.ingrdientsFormGroup.enable();
        this.stepsFormGroup.enable();
        this.isSaving = false;
        this.initialAboutState = this.aboutFormGroup.value;
        this.initialIngredientState = this.ingrdientsFormGroup.value;
        this.initialStepsState = this.stepsFormGroup.value;
        this.isChanged = false;
        this.snackBar.open('Recipe Saved!', 'DISMISS', { duration: 3000, verticalPosition: 'top' });
      })
      .catch(err => {
        this.aboutFormGroup.enable();
        this.ingrdientsFormGroup.enable();
        this.stepsFormGroup.enable();
        this.isSaving = false;
        this.snackBar.open('Error! Recipe not saved.', 'DISMISS', { duration: 3000, verticalPosition: 'top' });
        console.log(err);
      })
  }

  onCancel() {
    if (this.isChanged) {
      const ref = this.dialog.open(ChangesNotSavedComponent, {
        disableClose: true,
        width: '300px'
      });
      ref.afterClosed().subscribe(result => {
        if (result) {
          this.dialogRef.close();
        }
      });
    }
    else {
      this.dialogRef.close();
    }
  }

  get ingredients() { return this.ingrdientsFormGroup.get('ingredients') as FormArray; }
  get steps() { return this.stepsFormGroup.get('steps') as FormArray; }
  get tags() { return this.aboutFormGroup.get('tags') as FormArray; }
  get image() { return this.aboutFormGroup.get('image') as FormControl; }
  get originalURL() { return this.aboutFormGroup.get('originalURL') as FormControl; }

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
          this.aboutFormGroup.patchValue({ image: result.url });
        }
      }
    });
  }

  addOrigURL() {
    const ref = this.dialog.open(OrigUrlEditComponent, {
      data: { originalURL: this.originalURL.value },
      width: '350px'
    });

    ref.afterClosed().subscribe(result => {
      if (result) {
        if (result.changed && result.url) {
          this.aboutFormGroup.patchValue({ originalURL: result.url });
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

  compareAbout(changes: any): boolean {
    const tagsChanged = JSON.stringify(this.initialAboutState.tags) !== JSON.stringify(changes.tags);

    return this.initialAboutState.name !== changes.name
      || this.initialAboutState.prepTime !== changes.prepTime
      || this.initialAboutState.cookTime !== changes.cookTime
      || this.initialAboutState.yield !== changes.yield
      || this.initialAboutState.description !== changes.description
      || this.initialAboutState.originalURL !== changes.originalURL
      || this.initialAboutState.image !== changes.image
      || tagsChanged;
  }

}
