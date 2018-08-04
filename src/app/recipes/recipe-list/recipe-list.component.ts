import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: 'recipe-list.component.html',
  styleUrls: ['recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {

  recipes;

  status;
  success;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.setSearchBarToHeader(true);

    this.recipeService.getMyRecipes().subscribe( res => {
      this.status = res['status'];
      if(this.status == 200){
        this.recipes = res['myRecipes'];
      }
      else {
        this.success = res['success'];
      }
    });
  }

}
