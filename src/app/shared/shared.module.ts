import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from './app-material.module';
import { BaseUnsubscribeComponent } from './base-unsubscribe/base-unsubscribe.component';
import { ChangesNotSavedComponent } from './changes-not-saved/changes-not-saved.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  declarations: [
    ChangesNotSavedComponent,
    BaseUnsubscribeComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    ChangesNotSavedComponent,
    BaseUnsubscribeComponent
  ],
  entryComponents: [
    ChangesNotSavedComponent
  ]
})
export class SharedModule { }
