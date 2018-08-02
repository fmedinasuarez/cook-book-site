import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: 'main-page.component.html',
  styleUrls: ['main-page.component.css']
})
export class MainPageComponent implements OnInit {
  recipeName;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  processSearchForm(){
    const allInfo = `Recipe name: ${this.recipeName}.`;
    alert(allInfo);
  }

}
