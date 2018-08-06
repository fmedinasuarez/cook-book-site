import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../recipe.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: 'recipe-list.component.html',
  styleUrls: ['recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {

  recipes;

  status;
  success;

  listRecipeContext;
  recipeTitle;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeService.setSearchBarToHeader(true);

    this.route.params.subscribe( params => {
      this.listRecipeContext = params['list-recipes'];

      if( this.listRecipeContext.includes("search")) {
        this.recipeTitle =  this.listRecipeContext.slice(7,this.listRecipeContext.length);
        this.listRecipeContext = "search";
        this.recipeService.getRecipesByTitle(this.recipeTitle).subscribe(res => {
          this.status = res['status'];
          if(this.status == 200){
            this.recipes = res['recipes'];
          }
          else {
            this.success = res['success'];
          }
        })
      }
      else if(this.listRecipeContext == 'my-recipes') {
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
    })
  }

}
