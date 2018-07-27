import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: 'log-in.component.html',
  styleUrls: ['log-in.component.css']
})
export class LogInComponent implements OnInit {
  email;
  password;

  constructor() { }

  ngOnInit() {
    var dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.addEventListener('click', function(event) {
      event.stopPropagation();
    });
  }

  processLoginForm(){
    const allInfo = `Email: ${this.email}. Password: ${this.password}`;
    alert(allInfo);
  }

}
