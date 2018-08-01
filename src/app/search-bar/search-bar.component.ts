import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: 'search-bar.component.html',
  styleUrls: ['search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  recipeName;

  constructor(private router : Router) { }

  ngOnInit() {
  }

  processSearchForm(){
    /*
    localStorage.setItem('recipe-session','on-recipes-list');
    this.router.navigate(['recipes']);*/
  }

}
