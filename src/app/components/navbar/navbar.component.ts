import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userIsAuthenticated = false;

  constructor(private service:UsersService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.service.getAuth();
    console.log(this.userIsAuthenticated);
  }

  onlogout(){
    this.service.logout();
  }
}
