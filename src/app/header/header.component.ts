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
    var dropdown = document.querySelector('.dropdown');
    dropdown.addEventListener('click', function(event) {
      event.stopPropagation();
      dropdown.classList.toggle('is-active');
    });
    
    document.addEventListener('click', function() {
      if(dropdown.classList.contains('is-active')){
        dropdown.classList.remove('is-active');
      }
    });
    /* header transition animation when user scroll 1/3 of height screen*/
    var y = screen.height;
    var yShow = y/3;
    var ok = false;
    var html = document.querySelector('html');
    var navbar = document.querySelector('.navbar');
    var navbarItems = document.getElementsByClassName("navbar-item");
    var login = document.getElementById("login");

    window.addEventListener('scroll',function(){
      if(window.pageYOffset >= yShow){
        ok = true;
        html.classList.add('has-navbar-fixed-top');
        navbar.classList.add('is-fixed-top');
        (navbar as HTMLElement).style.background = 'black';
        for(var i=0; i<navbarItems.length; i++) {
          navbarItems[i].classList.remove('has-text-dark');
          navbarItems[i].classList.add('has-text-white');
        }
        login.classList.remove('has-text-dark');
        login.classList.add('has-text-white');
      }
      else {
        if(ok){
          html.classList.remove('has-navbar-fixed-top');
          navbar.classList.remove('is-fixed-top');
          (navbar as HTMLElement).style.background = 'lightgray';
          for(var i=0; i<navbarItems.length; i++) {
            navbarItems[i].classList.remove('has-text-white');
            navbarItems[i].classList.add('has-text-dark');
          }
          login.classList.remove('has-text-white');
          login.classList.add('has-text-dark');
          ok= false;
        }
      }
    })
  }
}
