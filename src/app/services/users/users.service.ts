import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private http: HttpClient) { }
  
  auth : any;
  getAuthString(){
    const authString = localStorage.getItem("auth");
    if(authString == "true"){
      this.auth = true;
    }
    else{
      this.auth = false;
    }
  }
 
  register(registerForm){
    const body = registerForm.value;
    console.log(body);
    return this.http.post('http://localhost:3000/users', body).subscribe(data => {
      console.log('User is successfully registered ', data);
    },
     error => 
      { console.log('Error', error); }
    );
      
  }

  getUsers(){
    return this.http.get('http://localhost:3000/users');
  }

  logout(){
    localStorage.setItem("id", "");
    localStorage.setItem("auth", "false");
    this.setAuth(false);
  }

  getAuth(){
    this.getAuthString()
    return this.auth;
  }

  setAuth(value){
    this.auth = value;
  }
}
