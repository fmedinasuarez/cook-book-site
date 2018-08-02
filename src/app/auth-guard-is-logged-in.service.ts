import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuardIsLoggedInService implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate() {
    var loggedIn = false;
    this.userService.isLoggedIn.subscribe(value => loggedIn = value);
    if(!loggedIn) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
