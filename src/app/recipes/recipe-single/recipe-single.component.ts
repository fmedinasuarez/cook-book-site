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
  context;
  
  recipe;
  
  title = '';
  ingredients = [];
  steps = '';

  eTitle = false;
  eIngs = false;
  eSteps = false;

  showErrorMessage = false;
  errorMessage = '';

  success = '';
  status = -1;

  constructor(private route: ActivatedRoute, private userService: UserService, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const recipeTitle_id = params['recipeTitle_id'];
      var id = recipeTitle_id.slice(recipeTitle_id.lastIndexOf("_")+1, recipeTitle_id.length);
      this.recipeService.getRecipeById(id).subscribe( res => {
        this.recipe = res['recipe'];
      })

      this.context = params['search-or-list'];
    })

    document.addEventListener('click', (event) => {
      var i = document.getElementById("i-0");
      var target = event.target;
      if(target === i){
        return;
      }
      this.showErrorMessage = false;
    });
  }

  editTitle() {
    this.title = this.recipe.title;
    this.eTitle = true;
  }

  editIngredients() {
    this.ingredients = this.recipe.ingredients.slice();
    this.eIngs = true;
  }

  editSteps() {
    this.steps = this.recipe.steps;
    this.eSteps = true;
  }

  customTrackBy(i) {
    return i;
  }

  addIngredient() {
    this.ingredients.push("");
  }

  removeIngredient(i) {
    var inputIngredient = document.querySelectorAll('.control');
    if(inputIngredient.length == 7) {
      this.showErrorMessage = true;
      this.errorMessage = "At least one ingredient is required.";
    }
    else
      this.ingredients.splice(i, 1);
  }

  acceptEdit() {
    if(this.eTitle)
      this.recipe.title = this.title;
    if(this.eIngs)
      this.recipe.ingredients = this.ingredients.slice();
    if(this.eSteps)
      this.recipe.steps = this.steps;

    var data = {
      "recipe" : this.recipe, 
    };
    this.recipeService.editRecipe(data).subscribe(res => {
      this.status = res['status'];
      if(this.status == 200) {
        this.recipe = res['recipe'];
      }
      else {
        this.errorMessage = res['success'];
        this.showErrorMessage = true;
      }
    })
    this.eTitle = false;
    this.eIngs = false;
    this.eSteps = false;
  }
  
  cancelEdit() {
    this.eTitle = false;
    this.eIngs = false;
    this.eSteps = false;
  }

}
