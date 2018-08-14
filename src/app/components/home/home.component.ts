import { Component, OnInit} from '@angular/core';
import { UserService } from '../../user.service';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  recipeName;

  constructor(private userService: UserService, private recipeService: RecipeService) {
  }

  ngOnInit() {
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
