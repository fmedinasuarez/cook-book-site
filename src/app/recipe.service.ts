import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  apiUrl = 'http://192.168.0.117:3000/api/';

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

  addRecipe(recipe: recipe):Observable<any> {
    return this.http.post(`${this.apiUrl}addRecipe`, recipe);
  }

  getMyRecipes():Observable<any> {
    return this.http.get(`${this.apiUrl}myRecipes/${this.userDataStatus}`);
  }

  getRecipesByTitle(title:string):Observable<any> {
    return this.http.get(`${this.apiUrl}recipesByTitle/${title}`);
  }

  saveRecipe(data):Observable<any> {
    return this.http.put(`${this.apiUrl}saveRecipe`, data);
  }

  getSavedRecipes():Observable<any> {
    return this.http.get(`${this.apiUrl}savedRecipes/${this.userDataStatus}`);
  }

  deleteSavedRecipe(data):Observable<any> {
    return this.http.post(`${this.apiUrl}deleteSavedRecipe`,data);
  }

  getRecipeById(id):Observable<any> {
    return this.http.get(`${this.apiUrl}recipeById/${id}`);
  }

  deleteMyRecipe(data):Observable<any> {
    return this.http.post(`${this.apiUrl}deleteMyRecipe`,data);
  }

  editRecipe(recipe: recipe):Observable<any> {
    return this.http.put(`${this.apiUrl}editRecipe`, recipe);
  }

}