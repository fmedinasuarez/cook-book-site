import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { UserService } from '../../user.service';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-single',
  templateUrl: 'recipe-single.component.html',
  styleUrls: ['recipe-single.component.css']
})
export class RecipeSingleComponent implements OnInit {

  isLoggedIn = false;
  context;
  recipe;

  constructor(private route: ActivatedRoute, private userService: UserService, private recipeService: RecipeService) { }

  ngOnInit() {
    this.userService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);

    this.route.params.subscribe(params => {
      const recipeTitle_id = params['recipeTitle_id'];
      var id = recipeTitle_id.slice(recipeTitle_id.lastIndexOf("_")+1, recipeTitle_id.length);
      this.recipeService.getRecipeById(id).subscribe( res => {
        this.recipe = res['recipe'];
        console.log(this.recipe);
      });
      if(this.isLoggedIn) {
        this.context = params['search-or-list'];
        console.log(this.context);
      }
      else {
        this.context = params['only-search'];
        console.log(this.context);
      }
    })
  }

}
