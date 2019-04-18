import { Component, OnInit } from '@angular/core';
import {ChatService} from '../service/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ChatService]
})
export class HomeComponent implements OnInit {
  user:String;
  room:String;
  messageText:String;
  messageArray:Array<{user:String,message:String}> = [];
  constructor(private chatService:ChatService) { 
    // this.chatService.newUserJoined()
    // .subscribe(data=> this.messageArray.push(data));


    // this.chatService.userLeftRoom()
    // .subscribe(data=>this.messageArray.push(data));

    // this.chatService.newMessageReceived()
    // .subscribe(data=>this.messageArray.push(data));
  }

  ngOnInit() {
  }

//   join(){
//     this.chatService.joinRoom({user:this.user, room:this.room});
// }

// leave(){
//     this.chatService.leaveRoom({user:this.user, room:this.room});
// }

// sendMessage()
// {
//     this.chatService.sendMessage({user:this.user, room:this.room, message:this.messageText});
// }

}
