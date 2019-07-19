import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private users:UsersService, private router:Router) { }
  

  ngOnInit() {
  }
  
  onRegister(registerForm){
    this.users.register(registerForm);
    this.router.navigate(['/login']);
  }
  
}
