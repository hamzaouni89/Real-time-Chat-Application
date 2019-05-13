import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  connectedUser: any;
  constructor(private http: HttpClient, private router: Router) {
    this.connectedUser = this.getDecodedToken();
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getDecodedToken() {
    if (localStorage.getItem('token')) {
      var decoded = jwt_decode(localStorage.getItem('token'));
      return decoded;
    }
  }
  login(user) {
    return this.http.post('http://localhost:3000/users/login/', user)
  }
  getUser() {
    return this.http.get('http://localhost:3000/users/getUser/');
  }
  register(user) {
    return this.http.post('http://localhost:3000/users/register', user)
  }
  getUsers() {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/users/getUsers', { headers: header });
  }
  getUserById(ID) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`http://localhost:3000/users/getUserById/${ID}`, { headers: header });
  }
  getImage(NomImage) {
    console.log(NomImage);
    return this.http.get('http://localhost:3000/users/getImage/' + NomImage);
  }

  uploadImage(file) {
    console.log(file);
    return this.http.post('http://localhost:3000/users/upload/', file);
  }
}
