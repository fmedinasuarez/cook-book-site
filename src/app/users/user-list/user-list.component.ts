import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit {
  users;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
  }
}
