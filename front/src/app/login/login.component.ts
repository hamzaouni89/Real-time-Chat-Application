import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null, Validators.required)
  });
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  login(user) {

    this.userService.login(user).subscribe((res: any) => {
      if (res.Message === "authentification valide") {
        localStorage.setItem('token', res.token);
        this.userService.connectedUser = this.userService.getDecodedToken();
        this.router.navigate(['/home']);
      }
      else {
        console.log("user invalide");
      }
    });
  }

  moveToRegister(){
    this.router.navigate(['/user/register']);
  }
}
