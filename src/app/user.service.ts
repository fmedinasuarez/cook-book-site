import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  apiUrl2 = 'https://api.github.com/users';
  apiUrl = 'http://localhost:3000/api/';

  //loggedInStatus to manage hide/show header elements
  private loggedInStatus = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('loggedIn') || 'false'));

  constructor(private http: HttpClient) {
  }

  get isLoggedIn() {
    return this.loggedInStatus.asObservable();
  }
  
  setLoggedIn(value: boolean) {
    this.loggedInStatus.next(value);
    localStorage.setItem('loggedIn',value.toString());
  }
  //sacar
  getUsers() {
    return this.http.get(`${this.apiUrl2}`);
  }
  //sacar
  getUser(username:string) {
    return this.http.get(`${this.apiUrl2}/${username}`)
  }

  signUpUser(user) {
    return this.http.post(`${this.apiUrl}signup`, user);
  }

  loginUser(credentials) {
    return this.http.post(`${this.apiUrl}login`, credentials);
  }

}
