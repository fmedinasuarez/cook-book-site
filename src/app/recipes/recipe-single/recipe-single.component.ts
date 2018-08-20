import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import { RecipeService } from '../../recipe.service';
import { recipe } from '../../recipe';
import { response } from '../../response';

@Component({
  selector: 'app-recipe-single',
  templateUrl: 'recipe-single.component.html',
  styleUrls: ['recipe-single.component.css']
})
export class RecipeSingleComponent implements OnInit {
  context;
  
  recipe: recipe = null;
  
  title = '';
  ingredients = [];
  steps = '';

  eTitle = false;
  eIngs = false;
  eSteps = false;

  showErrorMessage = false;
  errorMessage = '';

  response : response;

  currentImg = 0;

  constructor(private route: ActivatedRoute, private userService: UserService, private recipeService: RecipeService) { }

  ngOnInit() {
    //Suscribe to activated route and see if it has changed
    this.route.params.subscribe(params => {
      const recipeTitle_id = params['recipeTitle_id'];
      //Take de _id of the recipe from the url params
      var id = recipeTitle_id.slice(recipeTitle_id.lastIndexOf("_")+1, recipeTitle_id.length);
      //Get the recipe bi the _id taken before
      this.recipeService.getRecipeById(id).subscribe( res => {
        this.response = res;
        //If not error get the recipe
        if(this.response.status == 200)
          this.recipe = this.response.data;
        else {//If error show a message error
          this.showErrorMessage= true;
          this.errorMessage = this.response.success;
        }
      })
      //Take the context: my-recipes, saved-recipes or search.
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
  //Manage the click on the edit title button
  editTitle() {
    this.title = this.recipe.title;
    this.eTitle = true;
  }
  //Manage the click on the edit ingredients button
  editIngredients() {
    this.ingredients = this.recipe.ingredients.slice();
    this.eIngs = true;
  }
  //Manage the click on the edit steps button
  editSteps() {
    this.steps = this.recipe.steps;
    this.eSteps = true;
  }

  customTrackBy(i) {
    return i;
  }
  //Add space to a new ingredient
  addIngredient() {
    this.ingredients.push("");
  }
  //Manage click on add new ingreient button
  removeIngredient(i) {
    if(i == 0 && this.ingredients.length == 1) {
      this.showErrorMessage = true;
      this.errorMessage = "At least one ingredient is required.";
    }
    else
      this.ingredients.splice(i, 1);
  }
  //Manage click on accept editon buuton
  acceptEdit() {
    if(this.eTitle)
      this.recipe.title = this.title;
    if(this.eIngs)
      this.recipe.ingredients = this.ingredients.slice();
    if(this.eSteps)
      this.recipe.steps = this.steps;

    this.recipeService.editRecipe(this.recipe).subscribe(res => {
      this.response = res;
      if(this.response.status == 200) {
        this.recipe = this.response.data;
      }
      else {
        this.errorMessage = this.response.success;
        this.showErrorMessage = true;
      }
    })
    this.eTitle = false;
    this.eIngs = false;
    this.eSteps = false;
  }
  //Manage click on cancel edition button
  cancelEdit() {
    this.eTitle = false;
    this.eIngs = false;
    this.eSteps = false;
  }

  prevImg() {
    var imgSlider = document.getElementById( "imgSlider");
    this.currentImg--;
    if(this.currentImg < 0) {
      this.currentImg = this.recipe.imagesData.length - 1;
    }
    (imgSlider as HTMLImageElement).src = this.recipe.imagesData[this.currentImg]; 
  }

  nextImg() {
    var imgSlider = document.getElementById( "imgSlider");
    this.currentImg++;
    if(this.currentImg >= this.recipe.imagesData.length) {
      this.currentImg = 0;
    }
    (imgSlider as HTMLImageElement).src = this.recipe.imagesData[this.currentImg];
  }

  showButtons() {
    var prevButtonId = document.getElementById('prevButtonId');
    prevButtonId.style.display = 'block';
    var nextButtonId = document.getElementById('nextButtonId');
    nextButtonId.style.display = 'block';
  }

  hideButtons() {
    var prevButtonId = document.getElementById('prevButtonId');
    prevButtonId.style.display = 'none';
    var nextButtonId = document.getElementById('nextButtonId');
    nextButtonId.style.display = 'none';
  }
}
