import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-main-page',
  templateUrl: 'main-page.component.html',
  styleUrls: ['main-page.component.css']
})
export class MainPageComponent implements OnInit {
  recipeName;

  constructor(private userService: UserService, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    //Set bar to header to false
    this.recipeService.setSearchBarToHeader(false);

    var cookBookId = document.getElementById('cookBookId');
    cookBookId.addEventListener('mouseover', () => {
      cookBookId.classList.add('animated', 'pulse');
    })

    cookBookId.addEventListener('mouseout', () => {
      cookBookId.classList.remove('animated', 'pulse');
    })
  }

}
