import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: 'search-bar.component.html',
  styleUrls: ['search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  recipeName;

  results;
  values= '';

  success;
  status;

  constructor(private router : Router, private recipeService: RecipeService) { }

  ngOnInit() {
    var input = document.getElementById('searchBarInput');
    var table = document.getElementById('tableResults');

    input.addEventListener('focus',() => {
      if((table as HTMLElement).style.display == "none") { 
        (table as HTMLElement).style.display = "block";
      }
    })

    document.addEventListener('click',(e) => {
      var target = event.target;
      if(target != input){
        if((table as HTMLElement).style.display == "block") {
          (table as HTMLElement).style.display = "none";
        }
      }
    })
  }

  processSearchBarForm(){
    this.router.navigate(['search:'+this.recipeName]);
  }

  onKey(event: any) {
    this.values = event.target.value;
    if(this.values == '') {
      this.results = [];
    }
    else {
      this.recipeService.getRecipesByTitle(this.values).subscribe(res => {
        this.status = res['status'];
        if(this.status == 200){
          this.results = res['recipes'];
        }
        else {
          this.success = res['success'];
        }
      })
    }
  }

}