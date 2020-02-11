import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dav-cooks-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddRecipeComponent>) { }

  ngOnInit(): void {
  }

  onSaveClick() {
    this.dialogRef.close();
  }

}
