import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../payload/login.request';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: LoginRequest = new LoginRequest(); 

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(): void { 
    this.userService.login(this.user).subscribe(response => {
      console.log(response.headers);
      localStorage.setItem('token', response.headers.get('Authorization')!.replace('Bearer ', '').trim());
      console.log(localStorage);
      this.router.navigate(['landing']);
    })
  }
}