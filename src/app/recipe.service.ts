import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  apiUrl = 'http://localhost:3000/api/';

  private userDataStatus = localStorage.getItem('userData') || "";
  private searchBarToHeaderStatus = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('searchBarToHeader') || 'false'));

  constructor(private http: HttpClient) {}

  setUserData(value:string) {
    this.userDataStatus = value;
    localStorage.setItem('userData', value);
  }
  get userData(){
    return this.userDataStatus;
  }

  setSearchBarToHeader(value:boolean) {
    this.searchBarToHeaderStatus.next(value);
    localStorage.setItem('searchBarToHeader',value.toString());
  }
  get searchBarToHeader() {
    return this.searchBarToHeaderStatus.asObservable();
  }

  addRecipe(recipe) {
    return this.http.post(`${this.apiUrl}addrecipe`, recipe);
  }

  getMyRecipes() {
    return this.http.get(`${this.apiUrl}myrecipes/${this.userDataStatus}`);
  }

  getRecipesByTitle(title) {
    return this.http.get(`${this.apiUrl}recipesByTitle/${title}`);
  }

}