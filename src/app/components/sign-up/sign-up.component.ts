import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  name;
  surname;
  email;
  password;

  constructor() { }

  ngOnInit() {
  }

  processForm(){
    const allInfo = `Name: ${this.name}. Surname: ${this.surname}.Email: ${this.email}. Password: ${this.password}`;
    alert(allInfo);
  }
}
