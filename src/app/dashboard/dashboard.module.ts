import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RecipesModule } from '../recipes/recipes.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RecipesModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    UserMenuComponent
  ]
})
export class DashboardModule { }
