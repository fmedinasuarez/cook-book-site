import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: 'log-in.component.html',
  styleUrls: ['log-in.component.css']
})
export class LogInComponent implements OnInit {
  email="";
  password="";

  success;
  status;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  processLoginForm(){
    var credentials = {
      "email": this.email,
      "password": this.password
    }

    this.userService.loginUser(credentials).subscribe( res => {
      console.log(res);
      this.success = res['success'];
      this.status = res['status'];

      if(this.status == 200) {
        this.userService.setLoggedIn(true);
        this.router.navigate(['/main']);
      }
    })    
  }
}
