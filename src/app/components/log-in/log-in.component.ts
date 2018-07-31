import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: 'log-in.component.html',
  styleUrls: ['log-in.component.css']
})
export class LogInComponent implements OnInit {
  email;
  password;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  processLoginForm(){
    /*procces data and cominucate with server*/
    const allInfo = `Email: ${this.email}. Password: ${this.password}`;
    alert(allInfo);
    this.router.navigate(['/main']);
  }

}
