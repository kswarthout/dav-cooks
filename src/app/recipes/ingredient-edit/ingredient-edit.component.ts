import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'dav-cooks-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.scss']
})
export class IngredientEditComponent implements OnInit {

  @Input('ingredient') ingredientForm: FormGroup;
  @Input('index') index: number;
  @Output('remove') removeItem = new EventEmitter();
  @Output('add') addItem = new EventEmitter();
  @Output('move-up') moveUp = new EventEmitter();
  @Output('move-down') moveDown = new EventEmitter();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  get name() { return this.ingredientForm.get('name'); }
  get quantity() { return this.ingredientForm.get('quantity'); }

  remove() { this.removeItem.emit(); }
  up() { this.moveUp.emit(); }
  down() { this.moveDown.emit(); }

  onKeydown(event) {
    if (event.key === "Enter") {
      this.addItem.emit();
    }
  }

}
