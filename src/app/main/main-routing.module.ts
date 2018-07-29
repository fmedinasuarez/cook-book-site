import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'add-recipe',
    component: AddRecipeComponent,
  },
  {
    path: 'my-recipes',
    loadChildren: 'src/app/main/recipes/recipes.module#RecipesModule',
  },
  {
    path: 'saved-recipes',
    loadChildren: 'src/app/main/recipes/recipes.module#RecipesModule',
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
