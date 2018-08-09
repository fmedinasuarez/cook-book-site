import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory } from '@angular/core';
import { UserService } from '../user.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { SearchBarComponent} from '../search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
  //To reuse searchBarComponent
  componentRef: any;
  @ViewChild('searchbarcontainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  email;
  password;
  isLoggedIn: boolean= false;
  showSearchBar: boolean= false;

  constructor(private resolver: ComponentFactoryResolver, private userService: UserService, private recipeService: RecipeService, private router: Router) {
  }

  ngOnInit() {
    this.recipeService.searchBarToHeader.subscribe(showSearchBar => {
      this.showSearchBar = showSearchBar;
      if(this.showSearchBar)
        this.createSearchBarComponent();
      else {
        if (this.componentRef != undefined)
          this.destroySearchBarComponent();
      }
    });

    //suscribe to isLoggedIn to see if the user is logged in or out
    this.userService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);

    var navbarBurgerId = document.querySelector(".navbar-burger");
    var navbarMenuId = document.getElementById("navbar-menu-id");
    var navbarItems = document.getElementsByClassName("navbar-item");
    var navbar = document.querySelector('.navbar');

    /*toggle is-active navbar burger menu when click it*/
    navbarBurgerId.addEventListener('click', (e) => {
      e.stopPropagation();
      navbarMenuId.classList.toggle('is-active');
      navbarBurgerId.classList.toggle('is-active');
      if(navbarBurgerId.classList.contains('is-active')) {
        (navbar as HTMLElement).style.height = '100%';
        navbarMenuId.style.height = '100%';
        (navbar as HTMLElement).style.background = 'rgba(255, 255, 255, 0.4)';
        navbarMenuId.style.background = 'rgba(255, 255, 255, 0.4)';
        for(var i=1; i<navbarItems.length; i++){
          (navbarItems[i] as HTMLElement).style.fontSize = 'xx-large';
          (navbarItems[i].firstElementChild as HTMLElement).style.marginRight = '15px';
        }
      }
      else {
        (navbar as HTMLElement).style.height = '0';
        navbarMenuId.style.background = 'rgba(255, 255, 255, 0.4)';
        (navbar as HTMLElement).style.background = 'white';
        for(var i=1; i<navbarItems.length; i++){
          (navbarItems[i] as HTMLElement).style.fontSize = 'medium';
          (navbarItems[i].firstElementChild as HTMLElement).style.marginRight = '5px';
        }
      }
    })

    /*when click on the document close the navbar burger menu*/
    document.addEventListener('click', (e) => {
      var target = e.target;
      if(this.showSearchBar) {
        var searchBarInput = document.getElementById('searchBarInput');
        if(target === searchBarInput) 
          return;
      }
      if(navbarBurgerId.classList.contains('is-active'))  {
        navbarMenuId.classList.remove('is-active');
        navbarBurgerId.classList.remove('is-active');
        (navbar as HTMLElement).style.height = '0';
        (navbar as HTMLElement).style.background = 'white';
        for(var i=1; i<navbarItems.length; i++){
          (navbarItems[i] as HTMLElement).style.fontSize = 'medium';
          (navbarItems[i].firstElementChild as HTMLElement).style.marginRight = '5px';
        }
      }
    });

  }

  //To create searchaBarComponent on header
  createSearchBarComponent() {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(SearchBarComponent);
    this.componentRef = this.entry.createComponent(factory);
  }
  //To destroy searchaBarComponent on header
  destroySearchBarComponent() {
    this.componentRef.destroy();
  }

  logOut(){
    this.userService.setLoggedIn(false);
    this.recipeService.setUserData('');
    this.router.navigate(['']);
  }
}
