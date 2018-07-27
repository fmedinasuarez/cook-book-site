import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-single',
  templateUrl: 'user-single.component.html',
  styles: []
})
export class UserSingleComponent implements OnInit {
  user;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
  
  // watch the route parameters for changes
  // every time it changes (or on first load), go get a user from userservice
  ngOnInit() {
    this.route.params.subscribe(params => {
      const username = params['username'];
      this.userService
          .getUser(username)
          .subscribe(user => this.user = user);
    })
  }

}
