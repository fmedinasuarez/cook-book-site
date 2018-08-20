import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { RecipeService } from '../../recipe.service';
import { credentials } from '../../credentials';
import { response } from '../../response';

@Component({
  selector: 'app-log-in',
  templateUrl: 'log-in.component.html',
  styleUrls: ['log-in.component.css']
})
export class LogInComponent implements OnInit {

  credentials: credentials = {
    email: '',
    password: '',
  }

  response : response = null;

  showErrorMessage=false;
  errorMessage;

  constructor(private userService: UserService, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    document.addEventListener('click', (event) => {
      var button = document.getElementById("logInButton");
      var target = event.target;
      if(target === button){
        return;
      }
      this.showErrorMessage = false;
      if(button != null)
        button.innerHTML = "Log in";
    });
  }

  processLoginForm(){
    var logInButton = document.getElementById('logInButton');

    this.userService.loginUser(this.credentials).subscribe( res => {
      this.response = res;
      console.log(this.response);

      if(this.response.status == 500) {
        logInButton.innerHTML = "Log in error";
        this.showErrorMessage = true;
        this.errorMessage = this.response.success;
      }

      if(this.response.status == 200) {
        setTimeout(()=>{
          logInButton.innerHTML = "Log in successfull";
          setTimeout(() => {
            this.userService.setLoggedIn(true);
            this.recipeService.setUserData(this.credentials.email);
            this.router.navigate(['main']);
          },500);
        },500);
      }
    })    
  }
}
