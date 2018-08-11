import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: 'search-bar.component.html',
  styleUrls: ['search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  recipeName = '';

  results = [];
  values = '';

  success;
  status;

  searchBarToHeader = false;
  isLoggedIn;

  constructor(private router : Router, private recipeService: RecipeService, private userService: UserService) { }

  ngOnInit() {
    this.userService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);

    var input = document.getElementById('searchBarInput');
    var table = document.getElementById('tableResults');

    input.addEventListener('focus',() => {
      if((table as HTMLElement).style.display == "none") { 
        (table as HTMLElement).style.display = "block";
      }
    })

    document.addEventListener('click',(event) => {
      var target = event.target;
      if(target != input && target!= table){
        if((table as HTMLElement).style.display == "block") {
          (table as HTMLElement).style.display = "none";
        }
      }
    })

    this.recipeService.searchBarToHeader.subscribe(searchBarToHeader => {
      this.searchBarToHeader = searchBarToHeader;
      var button = document.getElementById('searchButton');
      var formContainer = document.getElementById('findRecipeContainer');
      if(this.searchBarToHeader) {
        input.classList.remove('is-large');
        button.classList.remove('is-large');
        input.classList.add('is-small');
        button.classList.add('is-small');
      }
      else {
        input.classList.remove('is-small');
        button.classList.remove('is-small');
        input.classList.add('is-large');
        button.classList.add('is-large');
        (button as HTMLElement).style.borderColor = 'none';
      }
    });
  }

  processSearchBarForm(){
    if(this.recipeName != '') {
      if(this.isLoggedIn)
        this.router.navigate(['main/search:'+this.recipeName]);
      else
        this.router.navigate(['search:'+this.recipeName]);
    }
  }

  onKey(event: any) {
    this.values = event.target.value;
    if(this.values != '') {
      this.recipeService.getRecipesByTitle(this.values).subscribe(res => {
        this.status = res['status'];
        if(this.status == 200){
          let set = {}, recipes = res['recipes'];
          this.results = (recipes.filter(obj => !set[obj.title] && (set[obj.title] = true))).slice(0,6);
        }
        else {
          this.success = res['success'];
        }
      })
    }
    else
      this.results = [];
  }

  searchClicked(i) {
    this.recipeName = this.results[i].title;
    if(this.isLoggedIn)
      this.router.navigate(['main/search:'+this.recipeName]);
    else
      this.router.navigate(['search:'+this.recipeName]);

  }

}