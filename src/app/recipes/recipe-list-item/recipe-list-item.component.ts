import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Recipe } from '@models/recipe.model';

import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';

@Component({
  selector: 'dav-cooks-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.scss']
})
export class RecipeListItemComponent implements OnInit {

  @Input('recipe') recipe: Recipe;
  @Output('selected') itemSelected = new EventEmitter<boolean>();
  checked: boolean = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  selected(): void {
    this.itemSelected.emit(this.checked);
  }

  edit() {
    this.dialog.open(RecipeEditComponent, {
      height: '500px',
      disableClose: true,
      panelClass: 'app__full__bleed__dialog',
      data: this.recipe
    });
  }

  view() {

  }

}
