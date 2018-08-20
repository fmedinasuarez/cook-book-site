import { Component, OnInit } from '@angular/core';
import { UserListComponent } from '../../users/user-list/user-list.component';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { RecipeService } from '../../recipe.service';
import { user } from '../../user';
import { response } from '../../response';

@Component({
  selector: 'app-sign-up',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: user = {
    name: '' ,
    sureName: '',
    email: '',
    password: '',
    myRecipes: [],
    savedRecipes: [],
  }

  response : response = null;

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
      if(button != null)
        button.innerHTML = "Sign Up";
    });
  }

  signUpForm(){
    var signUpButton = document.getElementById('signUpButton');

    this.userService.signUpUser(this.user).subscribe(res => {
      this.response = res;

      if(this.response.status == 500) {
        signUpButton.innerHTML = "Sign Up Error";
        this.showErrorMessage = true;
        this.errorMessage = this.response.success;
      }

      if(this.response.status == 200) {
        setTimeout(()=>{
          signUpButton.innerHTML = "Sign Up Successfull";
          setTimeout(() => {
            this.userService.setLoggedIn(true);
            this.recipeService.setUserData(this.user.email);
            this.router.navigate(['/main']);
          },500);
        },500);
      }
    });
  }
}
