import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: 'main-page.component.html',
  styleUrls: ['main-page.component.css']
})
export class MainPageComponent implements OnInit {
  recipeName;

  constructor() { }

  ngOnInit() {
    /*Allow access if user is loged in. If not go to home page
    if(!this.userService.getUserIsLogin()){
      this.router.navigate(['']);
    }*/
  }

  processSearchForm(){
    const allInfo = `Recipe name: ${this.recipeName}.`;
    alert(allInfo);
  }

}
