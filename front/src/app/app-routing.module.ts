import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'', redirectTo:'user', pathMatch:'full'},
  { path : 'user' , component : UserComponent,
  children : [
    { path : 'register' , component : RegisterComponent},
    { path : 'login' , component : LoginComponent},
  ]},
 
  { path : 'home' , component : HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
