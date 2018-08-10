import { Component, OnInit } from '@angular/core';
import { debug } from 'util';
import { MaxLengthValidator } from '@angular/forms';
import { RecipeService } from '../../recipe.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: 'add-recipe.component.html',
  styleUrls: ['add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  title;
  ingredients: any[] = [];
  steps;
  email;

  showErrorMessage = false;
  errorMessage = "";

  success;
  status;
  
  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.recipeService.setSearchBarToHeader(true);

    this.ingredients.push("");
    
    document.addEventListener('click', (event) => {
      var i = document.getElementById("i-0");
      var target = event.target;
      if(target === i){
        return;
      }
      this.showErrorMessage = false;
    });
    //When click on add new recipe button of modal close modal and clean inputs
    var modal = document.querySelector('.modal');
    var newRecipeButton = document.getElementById('b-4');
    var inputs = document.getElementsByTagName("input");
    var textArea = document.querySelector('.textarea');
    newRecipeButton.addEventListener('click', () => {
      modal.classList.toggle('is-active');
      for(var i=0; i < inputs.length; i++)  {
        inputs[i].value = '';
      }
      (textArea as HTMLTextAreaElement).value = '';
    })
  }

  customTrackBy(i) {
    return i;
  }

  addIngredient() {
    this.ingredients.push("");
  }

  removeIngredient(i) {
    var inputIngredient = document.querySelectorAll('.control');
    if(inputIngredient.length == 4) {
      this.showErrorMessage = true;
      this.errorMessage = "At least one ingredient is required.";
    }
    else
      this.ingredients.splice(i, 1);
  }

  processForm(){
    var recipe = {
      "title": this.title,
      "ingredients": this.ingredients,
      "steps": this.steps,
      "user" : this.recipeService.userData,
    }
    this.recipeService.addRecipe(recipe).subscribe(res => {
      this.success = res['success'];
      this.status = res['status'];
      var modal = document.querySelector('.modal');

      if(this.status == 500) {
        this.showErrorMessage = true;
        this.errorMessage = this.success;
      }
      else {
        modal.classList.toggle('is-active');
      }
    })
  }
}
