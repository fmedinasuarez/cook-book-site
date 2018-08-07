import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { AuthGuardIsLoggedInService } from '../auth-guard-is-logged-in.service';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'add-recipe',
    component: AddRecipeComponent,
    canActivate: [AuthGuardIsLoggedInService]
  },
  {
    path: ':search-or-list',
    loadChildren: 'src/app/recipes/recipes.module#RecipesModule',
    canActivate: [AuthGuardIsLoggedInService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
