import { Component, OnInit } from '@angular/core';
import {ChatService} from '../service/chat.service';
import { UserService } from 'src/app/service/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ChatService]
})
export class HomeComponent implements OnInit {
  Users;
  token :any;
  fakePath : any;
  allUser: any = [];
  allUserMessage: any = [];
  privateMessage: any;
  schemaMessage: any;
  userMessage: any;
  messageSend: FormGroup;
  u;
  image: File;
  constructor(
    private chatService: ChatService,
    private userService: UserService,) {
      this.messageSend = new FormGroup({
        contenu: new FormControl('', [Validators.required, Validators.minLength(1)]),
      });
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.Users = users ;
      
    });
    this.token = this.userService.getDecodedToken();
    this.getConversation()
    this.getprivateMessageSocket()
 
  console.log(this.token);
  

  }
  getUserById(id){
    this.userService.getUserById(id).subscribe(res => {
      this.u = res ;
    });
  }
  
  getConversation() {

    
    this.chatService.getConversation(this.token._id).subscribe(res => {
      this.allUser = res;
      for (let i = 0; i < this.allUser.length; i++) {
        this.userService.getUserById(this.allUser[i]).subscribe(data => {
          this.allUserMessage.push(data);
        });
      }
    });
  }
  getprivateMessageSocket(){
    this.chatService.getprivateMessageSocket().subscribe((data: any) => {
      this.privateMessage = data;
    });
  }
     
  removeFakePathUrl(f) {
    this.fakePath = f.slice(12, f.length);
    return this.fakePath;
  }
  sendMessage(f) {   
      this.schemaMessage = {
        user1 : this.token._id,
        user2 : f,
        messages : [{
          contenu : this.messageSend.value.contenu,
          date : Date.now(),
          from : this.token._id,
          to: f
        }]
      };
      this.chatService.sendMessage(this.schemaMessage).subscribe(res => {
        this.findConversation(f);
        this.messageSend.controls.contenu.setValue(''); 
        this.getprivateMessageSocket();
      });
    }
 
  findConversation(f) {
    this.chatService.getPrivateConvertion(this.token._id, f).subscribe(res => {
    this.privateMessage = res;
  });
  }

  getUserMessage(f) {
    this.userService.getUserById(f).subscribe(res => {
      this.userMessage = res;
    });
  }
getUsers(){
  this.userService.getUsers().subscribe(users => {
    this.Users = users ;
  });
}
  getImage(image) {
    this.userService.getImage(image).subscribe((res) => {
      return this.getUsers();
    })
  }
  UpdateImage(event) {
    console.log(event[0])
    this.image = event[0]
  }
}
