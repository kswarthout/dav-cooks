import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '@models/recipe.model';

@Component({
  selector: 'dav-cooks-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.scss']
})
export class RecipeListItemComponent implements OnInit {

  @Input('recipe') recipe: Recipe;
  @Output('selected') itemSelected = new EventEmitter<boolean>();
  checked: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  selected(): void {
    this.itemSelected.emit(this.checked);
  }

}
