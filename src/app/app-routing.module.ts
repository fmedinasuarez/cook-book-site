import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { AuthGuardIsLoggedInService } from './auth-guard-is-logged-in.service';
import { AuthGuardIsLoggedOutService } from './auth-guard-is-logged-out.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [AuthGuardIsLoggedOutService]
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [AuthGuardIsLoggedOutService]
  },
  {
    path: 'log-in',
    component: LogInComponent,
    canActivate: [AuthGuardIsLoggedOutService]
  },
  {
    path: 'users',
    loadChildren: 'src/app/users/users.module#UsersModule'
  },
  {
    path: 'main',
    loadChildren: 'src/app/main/main.module#MainModule',
    canActivate: [AuthGuardIsLoggedInService],
  },
  {
    path: ':only-search',
    loadChildren: 'src/app/recipes/recipes.module#RecipesModule',
    canActivate: [AuthGuardIsLoggedOutService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
