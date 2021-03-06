import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeSingleComponent } from './recipe-single/recipe-single.component';

@NgModule({
  imports: [
    CommonModule,
    RecipesRoutingModule,
    FormsModule
  ],
  declarations: [RecipeListComponent, RecipeSingleComponent]
})
export class RecipesModule { }
