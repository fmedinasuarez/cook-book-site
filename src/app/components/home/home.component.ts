import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  recipeName;

  constructor() {
  }

  ngOnInit() {
  }
  
  processSearchForm(){
    const allInfo = `Recipe name: ${this.recipeName}.`;
    alert(allInfo);
  }

}
