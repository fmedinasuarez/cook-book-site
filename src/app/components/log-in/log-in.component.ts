import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { RecipeService } from '../../recipe.service';

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
    var credentials = {
      "email": this.email,
      "password": this.password
    }

    var logInButton = document.getElementById('logInButton');

    this.userService.loginUser(credentials).subscribe( res => {
      console.log(res);
      this.success = res['success'];
      this.status = res['status'];

      if(this.status == 500) {
        logInButton.innerHTML = "Log in error";
        this.showErrorMessage = true;
        this.errorMessage = this.success;
      }

      if(this.status == 200) {
        setTimeout(()=>{
          logInButton.innerHTML = "Log in successfull";
          setTimeout(() => {
            this.userService.setLoggedIn(true);
            this.recipeService.setUserData(this.email);
            this.router.navigate(['main']);
          },500);
        },500);
      }
    })    
  }
}
