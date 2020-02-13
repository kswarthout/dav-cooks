import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from './app-material.module';
import { BaseUnsubscribeComponent } from './base-unsubscribe/base-unsubscribe.component';
import { ChangesNotSavedComponent } from './changes-not-saved/changes-not-saved.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  declarations: [
    ChangesNotSavedComponent,
    BaseUnsubscribeComponent
  ],
  exports: [
    AppMaterialModule,
    ChangesNotSavedComponent,
    ReactiveFormsModule,
    BaseUnsubscribeComponent
  ],
  entryComponents: [
    ChangesNotSavedComponent
  ]
})
export class SharedModule { }
