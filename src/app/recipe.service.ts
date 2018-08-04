import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  apiUrl = 'http://localhost:3000/api/';

  private userDataStatus = localStorage.getItem('userData') || "";

  private searchBarToHeaderLocalStorage: boolean = JSON.parse(localStorage.getItem('searchBarToHeader') || 'false');
  private searchBarToHeaderStatus = new BehaviorSubject<boolean>(this.searchBarToHeaderLocalStorage);

  constructor(private http: HttpClient) {}

  setUserData(email:string) {
    this.userDataStatus = email;
    localStorage.setItem('userData',email);
  }

  get userData(){
    return this.userDataStatus;
  }

  setSearchBarToHeader(value:boolean) {
    this.searchBarToHeaderLocalStorage = value;
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

}