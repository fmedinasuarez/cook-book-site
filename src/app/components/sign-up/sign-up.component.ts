import { Component, OnInit } from '@angular/core';
import { UserListComponent } from '../../users/user-list/user-list.component';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  name;
  sureName;
  email;
  password;

  success;
  status;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  signUpForm(){
    var user = {
      "name": this.name,
      "sureName": this.sureName,
      "email": this.email,
      "password": this.password,
    };

    this.userService.signUpUser(user).subscribe(res => {
      this.success = res['success'];
      this.status = res['status'];
      if(this.status == 200) {
        this.router.navigate(['/main']);
      }
    });
  }
}
