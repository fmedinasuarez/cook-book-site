import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
  email;
  password;
  islogin;

  constructor(private route: ActivatedRoute) {
    /*this.islogin=false;*/
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

    /* header transition animation when user scroll 1/3 of height screen*/
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

    /*var searchBarInput = document.querySelector('.input');
    searchBarInput.classList.remove('is-large');
    searchBarInput.classList.add('is-small');

    var findForm = document.getElementById('findRecipeContainer');
    findForm.style.marginTop = '0';
    findForm.style.paddingLeft = '0';
    findForm.style.paddingRight = '0';

    var searchButton = document.getElementById("searchButton");
    searchButton.classList.remove('is-large');
    searchButton.classList.add('is-small');*/

  }
}
