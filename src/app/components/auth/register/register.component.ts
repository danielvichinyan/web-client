import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from '../payload/register.request';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public user: RegisterRequest = new RegisterRequest();

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register(): void {
    this.userService.register(this.user).subscribe(() => this.router.navigate(['login']));
  }
}