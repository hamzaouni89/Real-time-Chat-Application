import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  image: File;
  
  registerForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    nom:new FormControl(null,Validators.required),
    prenom:new FormControl(null,Validators.required),
    image:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required),
    cpass:new FormControl(null,Validators.required)
  })
  constructor(private router:Router, private userService:UserService) { }

  ngOnInit() {
  }
  moveToLogin(){
    this.router.navigate(['/login']);
  }
  register() {
    this.registerForm.value.image = this.image.name;
    this.userService.register(this.registerForm.value).subscribe((res) => {
      const file = new FormData()
     file.append("image", this.image);
     console.log(file);
     
      this.userService.uploadImage(file).subscribe(res => console.log(res))
      console.log(res);
      
      this.router.navigateByUrl('/login')
    });
  }
  handleFileInput(files: FileList) {
    this.image = files.item(0);
  }

}
