import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
  email;
  password;
  isLoggedIn: boolean= false;
  showSearchBar: boolean= false;

  constructor(private userService: UserService, private recipeService: RecipeService, private router: Router) {
  }

  ngOnInit() {
    var navbarBurgerId = document.querySelector(".navbar-burger");
    var navbarMenuId = document.getElementById("navbar-menu-id");
    var navbarItems = document.getElementsByClassName("navbar-item");
    var navbar = document.querySelector('.navbar');
    var html = document.querySelector('html');

    /*close navbar burger menu when click on items*/
    for(var i=0; i<navbarItems.length; i++) {
      navbarItems[i].addEventListener('click',function(){
        if(navbarMenuId.classList.contains('is-active')) {
          navbarMenuId.classList.remove('is-active');
        }
      })
    }

    /*toggle is-active navbar burger menu when click it*/
    navbarBurgerId.addEventListener('click',function(e) {
      html.classList.add('has-navbar-fixed-top');
      navbar.classList.add('is-fixed-top');
      e.stopPropagation();
      navbarMenuId.classList.toggle('is-active');
    })
    
    document.addEventListener('click', function() {
      /*when click on the document close the navbar burger menu*/
      if(navbarMenuId.classList.contains('is-active')) {
        navbarMenuId.classList.remove('is-active');
      }
    });

    /* header transition animation when user scroll 1/4 of height of the screen*/
    var y = screen.height;
    var yShow = y/4;
    var ok = false;

    window.addEventListener('scroll',function(){
      if(window.pageYOffset >= yShow){
        ok = true;
        /*navbar burger case*/
        if(!navbarMenuId.classList.contains('is-active')) {
          html.classList.add('has-navbar-fixed-top');
          navbar.classList.add('is-fixed-top');
        }
        (navbar as HTMLElement).style.background = 'black';
        /*navbar burger*/
        navbarMenuId.style.background = 'black';
        for(var i=0; i<navbarItems.length; i++) {
          navbarItems[i].classList.remove('has-text-dark');
          navbarItems[i].classList.add('has-text-white');
        }
      }
      else {
        if(ok){
          /*navbar burger case*/
          if(!navbarMenuId.classList.contains('is-active')) {
            html.classList.remove('has-navbar-fixed-top');
            navbar.classList.remove('is-fixed-top');
          }
          (navbar as HTMLElement).style.background = 'white';
          /*navbar burger*/
          navbarMenuId.style.background = 'white';
          for(var i=0; i<navbarItems.length; i++) {
            navbarItems[i].classList.remove('has-text-white');
            navbarItems[i].classList.add('has-text-dark');
          }
          ok= false;
        }
      }
    })

    //suscribe to isLoggedIn to see if the user is logged in or out
    this.userService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);

    this.recipeService.searchBarToHeader.subscribe(showSearchBar => this.showSearchBar = showSearchBar);
  }

  logOut(){
    this.userService.setLoggedIn(false);
    this.recipeService.setUserData('');
    this.router.navigate(['']);
  }
}
