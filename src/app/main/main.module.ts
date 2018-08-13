import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { SearchBarModule } from '../search-bar/search-bar.module';


@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    SearchBarModule
  ],
  declarations: [
    MainPageComponent,
    AddRecipeComponent
  ]
})
export class MainModule { }
