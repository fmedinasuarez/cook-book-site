import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';
import { recipe } from '../../recipe';
import { response } from '../../response';

@Component({
  selector: 'app-recipe-list',
  templateUrl: 'recipe-list.component.html',
  styleUrls: ['recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {

  recipes : Array<recipe> = [];
  savedRecipes : Array<recipe> = [];

  response: response;

  listRecipeContext;
  recipeTitle = '';
  iEliminatedRecipe = -1;

  isLoggedIn = false;

  constructor(private userService: UserService, private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //Set search bar to header to true
    this.recipeService.setSearchBarToHeader(true);
    //Susucribe to know if the user is logged in or out
    this.userService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    //suscribe to the route to know what service is required from the api
    this.route.params.subscribe( params => {
      var match = false;
      //if the user is logged in only can search or list recipes. The route is 'main/:search-or-list'
      if(this.isLoggedIn) {
        this.listRecipeContext = params['search-or-list'];
        //Search-or-list only can take 3 values
        //1) my-recipes
        if(this.listRecipeContext == 'my-recipes') {
          match = true
          this.recipeService.getMyRecipes().subscribe( res => {
            this.response = res;
            if(this.response.status == 200){
              this.recipes = this.response.data;
            }
          });
        }//2) saved-recipes
        else if(this.listRecipeContext == 'saved-recipes') {
          match = true
          this.recipeService.getSavedRecipes().subscribe( res => {
            this.response = res;
            if(this.response.status == 200){
              this.recipes = this.response.data;
            }
          });
        }
      }
      else {//If user in logged out, when this component is loaded I know the route is '/:only-search'
        this.listRecipeContext = params['only-search'];
      }

      if(!match) {
        //Only-search can take 1 value: 'search:'recipeTitle'
        //3)search:'recipeTitle'
        if(this.listRecipeContext != undefined && this.listRecipeContext.includes("search")) {
          this.recipeTitle =  this.listRecipeContext.slice(7,this.listRecipeContext.length);
          this.listRecipeContext = "search";
          if(this.recipeTitle != '') {
            if(this.isLoggedIn) {
              this.recipeService.getSavedRecipes().subscribe(res => {
                this.response = res;
                this.savedRecipes = this.response.data;
              });
            }
            this.recipeService.getRecipesByTitle(this.recipeTitle).subscribe(res => {
              this.response = res;
              if(this.response.status == 200){
                this.recipes = this.response.data;
              }
            })
          }
          else
            this.recipes = [];
        }
        else {//If route take any value but main/my-recipes, main/saved-recipes or [main]/search:recipeTitle,
              //the user is redirected to main or home
          if(this.isLoggedIn)
            this.router.navigate(['main']);
          else 
            this.router.navigate(['']);
        }
      }
    })

    this.handleDeleteModal();
  }

  //Manage click event on accept and cancel buttons of modal displayed when delete button is clicked
  handleDeleteModal() {
    var modal = document.querySelector('.modal');
    var cancelButton = document.getElementById('cancel');
    cancelButton.addEventListener('click', (e) => {
      modal.classList.toggle('is-active');
    })

    var acceptButton = document.getElementById('accept');
    acceptButton.addEventListener('click', (e) => {
      var data = {
        "recipe" : this.recipes[this.iEliminatedRecipe], 
        "user": this.recipeService.userData
      };
      if(this.listRecipeContext == 'saved-recipes') {
        this.recipeService.deleteSavedRecipe(data).subscribe(res => {
          this.response = res;
          this.recipes.splice(this.iEliminatedRecipe,1);
          this.iEliminatedRecipe = -1;
        })
      }
      else if(this.listRecipeContext == 'my-recipes') {
        this.recipeService.deleteMyRecipe(data).subscribe(res => {
          this.response = res;
          this.recipes.splice(this.iEliminatedRecipe,1);
          this.iEliminatedRecipe = -1;
        })
      }
      modal.classList.toggle('is-active');
      return;
    })
  }
  //Manage the click on save or saved buuton of recipe i
  saveUnsaveRecipe(i) {
    var saveButton = document.getElementById("saveButton-"+i);
    var data = {
      "recipe" : this.recipes[i], 
      "user": this.recipeService.userData
    };
    if(saveButton.innerHTML === "Save") {
      saveButton.innerHTML = "Saved";
      //Save recipe i in user savedRecipe's collection docs
      this.recipeService.saveRecipe(data).subscribe(res => {
        this.response = res;
      });
    }
    else {
      saveButton.innerHTML = "Save";
      this.recipeService.deleteSavedRecipe(data).subscribe(res => {
        this.response = res;
      });
    }
  }
  //Verify if recipe i is in saved recipes
  inSavedRecipes(r):boolean {
    for(var i= 0; i < this.savedRecipes.length; i++){
      if (r._id === this.savedRecipes[i]._id)
        return true;
    }
    return false;
  }

  //Set eliminated recipe atribute to i an d activate the modal with accept and cancel button
  deleteRecipe(i) {
    this.iEliminatedRecipe = i;
    var modal = document.querySelector('.modal');
    modal.classList.toggle('is-active');
  }

}
