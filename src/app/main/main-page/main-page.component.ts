import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: 'main-page.component.html',
  styleUrls: ['main-page.component.css']
})
export class MainPageComponent implements OnInit {
  recipeName;
  constructor() { }

  ngOnInit() {
  }

  processSearchForm(){
    const allInfo = `Recipe name: ${this.recipeName}.`;
    alert(allInfo);
  }

}
