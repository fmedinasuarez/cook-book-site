import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var handle = document.querySelector(".handle");
    var contactInfo = document.querySelector(".contact-info");
    handle.addEventListener('click',function(e){
      if((contactInfo as HTMLElement).style.display == 'none'){
        (contactInfo as HTMLElement).style.display = 'block';
      }
      else {
        (contactInfo as HTMLElement).style.display = 'none';
      }
    })

    /*first load*/
    var contact = document.getElementById("contact");
    var x = (screen.width*2) - 230;
    contact.style.width = x+"px";

    /* and when window resize*/
    window.addEventListener("resize", function() {
        var x = (screen.width*2) - 220;
        contact.style.width = x+"px";
    });
  }

}
