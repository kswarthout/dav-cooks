import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from './app-material.module';
import { ChangesNotSavedComponent } from './changes-not-saved/changes-not-saved.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  declarations: [
    ChangesNotSavedComponent
  ],
  exports: [
    AppMaterialModule,
    ChangesNotSavedComponent,
    ReactiveFormsModule
  ],
  entryComponents: [
    ChangesNotSavedComponent
  ]
})
export class SharedModule { }
