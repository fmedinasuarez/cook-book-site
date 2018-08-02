import { Component, OnInit } from '@angular/core';
import { debug } from 'util';

@Component({
  selector: 'app-add-recipe',
  templateUrl: 'add-recipe.component.html',
  styleUrls: ['add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  title;
  ingredients=[];
  steps;
  ingredient;
  
  constructor() { }

  ngOnInit() {
    /*var addIngredient = document.getElementById('b-2');
    addIngredient.addEventListener('click', () => {
      var fIngs = document.getElementsByName("fIng");
      var cantIng = fIngs.length;
      console.log(cantIng);

      var newIngredientField = document.createElement('div');
      newIngredientField.classList.add('field','has-addons');
      newIngredientField.id = 'fIng';
      newIngredientField.setAttribute('name','fIng');

      var p = document.createElement('p');
      p.classList.add('control', 'is-expanded');
      newIngredientField.appendChild(p);

      var inputIngredient = document.createElement('input');
      inputIngredient.classList.add('input','is-primary');
      inputIngredient.type = 'text';
      inputIngredient.placeholder = 'Ingredient: 100gr. flour';
      inputIngredient.name = 'ingredient'+cantIng.toString();
      inputIngredient.required = true;
      inputIngredient.setAttribute('ngModel','ingredients['+cantIng.toString()+']');
      /*inputIngredient.setAttribute('#ingredient'+cantIng.toString()+'Input','ngModel');
      p.appendChild(inputIngredient);

      var pIcon = document.createElement('p');
      pIcon.classList.add('control','has-icons');
      newIngredientField.appendChild(pIcon);

      var buttonIcon = document.createElement('button');
      buttonIcon.classList.add('button', 'has-text-white');
      buttonIcon.id = 'b1-1';
      pIcon.appendChild(buttonIcon);

      var spanIcon = document.createElement('span');
      spanIcon.classList.add('icon');
      buttonIcon.appendChild(spanIcon);

      var iIcon = document.createElement('i');
      iIcon.classList.add('fa','fa-times');
      spanIcon.appendChild(iIcon);

      var lastFIng = fIngs.item(cantIng-1);
      lastFIng.parentNode.insertBefore(newIngredientField, lastFIng.nextSibling);
    })*/
  }

  processForm(){
    console.log(this.title, this.ingredients, this.steps);
  }

}
