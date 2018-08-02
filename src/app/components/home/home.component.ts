import { Component, OnInit} from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  recipeName;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    /*this.userService.setLoggedIn(false);*/
  }
  
  processSearchForm(){
    const allInfo = `Recipe name: ${this.recipeName}.`;
    alert(allInfo);
  }

}
