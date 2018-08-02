import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://api.github.com/users';

  private loggedInLocalStorage = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  //loggedInStatus to manage hide/show header elements
  private loggedInStatus = new BehaviorSubject<boolean>(this.loggedInLocalStorage);

  constructor(private http: HttpClient) {
  }

  get isLoggedIn() {
    return this.loggedInStatus.asObservable();
  }
  
  setLoggedIn(value: boolean) {
    this.loggedInLocalStorage = value;
    this.loggedInStatus.next(value);
    localStorage.setItem('loggedIn',value.toString());
  }

  getUsers() {
    return this.http.get(`${this.apiUrl}`);
  }

  getUser(username:string) {
    return this.http.get(`${this.apiUrl}/${username}`)
  }

  signUpUser(user){
    return this.http.post('http://localhost:3000/signup', user);
  }

  loginUser(credentials) {
    return this.http.post('http://localhost:3000/login', credentials);
  }

  addRecipe(recipe) {
    return this.http.post('http://localhost:3000/addrecipe', recipe);
  }

}
