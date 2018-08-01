import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: 'main-page.component.html',
  styleUrls: ['main-page.component.css']
})
export class MainPageComponent implements OnInit {
  recipeName;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    //Allow access if user is loged in. If not go to home page
    var userSession: string = localStorage.getItem('user-session');
    if(userSession != 'is-logged-in') {
      this.router.navigate(['']);
    }
  }

  processSearchForm(){
    const allInfo = `Recipe name: ${this.recipeName}.`;
    alert(allInfo);
  }

}
