import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  privateMessage: any;
  constructor(public http: HttpClient, private socket: Socket) {

  }

  sendMessage(form) {
    return this.http.post('http://localhost:3000/conversations/message', form);
  }
  getConversation(id) {
    return this.http.get(`http://localhost:3000/conversations/message/${id}`);
  }
  getUserConversation( index) {
    return this.http.get(`http://localhost:3000/conversations/message/user/${index}`);
  }
  getPrivateConvertion(id, form) {
   return this.http.post(`http://localhost:3000/conversations/conversation/${id}/${form}`,null);
  }
  getprivateMessageSocket() {
    return this.socket.fromEvent('privateMessage');
  }
}
