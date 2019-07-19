import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private users:UsersService, private router:Router) { }
  allUsers : any
  auth = false;
  ngOnInit() {
  }

  onLogin(loginForm){
    this.users.getUsers().subscribe((res) => {
      this.allUsers = res;
      for(var i=0;i<this.allUsers.length;i++){
        if(this.allUsers[i]["email"] == loginForm.value.emailInput && this.allUsers[i]["password"] == loginForm.value.pass){
          console.log("User is successfully logged in");
          // this.auth = true;
          this.users.setAuth(true);
          localStorage.setItem("auth", "true");
          localStorage.setItem("id",this.allUsers[i]["id"]);
          this.router.navigate(['/home']);
        }
      }
    });
  }
}
