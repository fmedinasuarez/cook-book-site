import { Component, OnInit } from '@angular/core';
import { UserListComponent } from '../../users/user-list/user-list.component';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { RecipeService } from '../../recipe.service';

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

  showErrorMessage=false;
  errorMessage;

  constructor(private userService: UserService, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    document.addEventListener('click', (event) => {
      var button = document.getElementById("signUpButton");
      var target = event.target;
      if(target === button){
        return;
      }
      this.showErrorMessage = false;
    });
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

      if(this.status == 500) {
        this.showErrorMessage = true;
        this.errorMessage = this.success;
      }

      if(this.status == 200) {
        this.userService.setLoggedIn(true);
        this.recipeService.setUserData(this.email);
        this.router.navigate(['/main']);
      }
    });
  }
}
