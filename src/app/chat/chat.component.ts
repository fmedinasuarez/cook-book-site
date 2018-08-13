import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css']
})
export class ChatComponent implements OnInit {

  messages = [];
  message = '';
  user = '';

  status;
  success;

  constructor(private recipeService: RecipeService, private userService: UserService) { }

  ngOnInit() {
    var handle = document.querySelector(".handle");
    var card = document.querySelector(".card");
    handle.addEventListener('click',function(e){
      if((card as HTMLElement).style.display == 'none'){
        (card as HTMLElement).style.display = 'block';
        (handle as HTMLElement).style.display = 'none';
      }
      else {
        (card as HTMLElement).style.display = 'none';
      }
    })
    document.addEventListener('click', (e) => {
      var iconChat = document.getElementById('iconChat');
      var inputChatId = document.getElementById('inputChatId');
      var sendButtonId = document.getElementById('sendButtonId');
      var target = e.target;
      if(target != iconChat && target != handle && target != card && target != inputChatId && target != sendButtonId) {
        (card as HTMLElement).style.display = 'none';
        (handle as HTMLElement).style.display = 'block';
      }
    })
  }

  submitChatForm() {
    this.user = this.recipeService.userData;

    this.messages.push("You: "+this.message);

    var cardContent = document.querySelector('.card-content');
    cardContent.scrollTop = cardContent.scrollHeight;
    
    var inputChatId = document.getElementById('inputChatId');
    (inputChatId as HTMLInputElement).value = "";

    var data = {
      "message": this.message,
      "user": this.user
    }
    this.userService.chat(data).subscribe(res => {
      this.status = res['status'];
      if(this.status == 200) {
        var m = res['message'];
        this.messages.push(m);

        cardContent.scrollTop = cardContent.scrollHeight;
      }
      else
        this.success = res['success'];
    })
  }


}
