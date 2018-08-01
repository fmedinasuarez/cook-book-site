import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://api.github.com/users';

  constructor(private http: HttpClient) {
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

}
