import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../recipe.service';
import { Router } from '@angular/router';
import { recipe } from '../../recipe';
import { response } from '../../response';


@Component({
  selector: 'app-add-recipe',
  templateUrl: 'add-recipe.component.html',
  styleUrls: ['add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  recipe : recipe = {
    _id: null,
    title: '',
    ingredients: [],
    steps: '',
    user: this.recipeService.userData,
    imagesData: [],
  }

  showErrorMessage = false;
  errorMessage = "";

  response : response = null;

  imagesFile : Array<File> = [];
  
  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    //Set search bar to header to true
    this.recipeService.setSearchBarToHeader(true);
    //Init ingredients array to add the first ingredient
    this.recipe.ingredients.push("");
    
    document.addEventListener('click', (event) => {
      var i = document.getElementById("i-0");
      var target = event.target;
      if(target === i){
        return;
      }
      this.showErrorMessage = false;
    });
    //When click on add new recipe button of the modal, close modal and clean inputs
    var modal = document.querySelector('.modal');
    var newRecipeButton = document.getElementById('b-4');
    var inputs = document.getElementsByTagName("input");
    var textArea = document.querySelector('.textarea');
    newRecipeButton.addEventListener('click', () => {
      this.recipe.ingredients = [];
      this.recipe.ingredients.push("");
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
  //When click on add ingredient button, add space to a new ingredient
  addIngredient() {
    this.recipe.ingredients.push("");
  }
  //When click on delete ingredient, delete the ingredient i
  removeIngredient(i) {
    if(i == 0 && this.recipe.ingredients.length == 1) {
      this.showErrorMessage = true;
      this.errorMessage = "At least one ingredient is required.";
    }
    else
      this.recipe.ingredients.splice(i, 1);
  }

  deleteImage(j) {
    this.imagesFile.splice(j,1);
    this.recipe.imagesData.splice(j,1);
  }

  onFileChanged(event) {
    let initLenght = this.imagesFile.length;
    this.imagesFile.push(...event.target.files);
    for(var i = initLenght; i < this.imagesFile.length; i++) {
      this.writeImageData(this.imagesFile[i],i);
    }
  }

  writeImageData(imageFile,i) {
    var fr = new FileReader();
    fr.onload = () => {
      this.recipe.imagesData[i] = fr.result;
    }
    fr.readAsDataURL(imageFile);
  }

  //Process the form when click on publish button
  processForm(){
    this.recipeService.addRecipe(this.recipe).subscribe(res => {
      this.response = res;
      var modal = document.querySelector('.modal');

      if(this.response.status == 500) {
        this.showErrorMessage = true;
        this.errorMessage = this.response.success;
      }
      else {
        modal.classList.toggle('is-active');
      }
    })
  }
}
