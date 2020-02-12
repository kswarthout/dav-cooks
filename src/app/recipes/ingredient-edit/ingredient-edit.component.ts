import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'dav-cooks-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.scss']
})
export class IngredientEditComponent implements OnInit {

  @Input('ingredient') ingredientForm: FormGroup;
  @Output('remove') removeItem = new EventEmitter();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  remove() {
    this.removeItem.emit();
  }

}
