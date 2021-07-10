import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/main/auth/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isUserLoggedIn: boolean = false;

  constructor(
    private router: Router, 
    private userService: UserService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.isUserLoggedIn = this.userService.isLoggedIn;
      }
    })
  }

  public logout(): void {
    this.isUserLoggedIn = false;
    this.userService.isLoggedIn = false;
    localStorage.removeItem('token');
    this.successfullyLoggedOut();
    this.router.navigate(['welcome']);
  }

  public successfullyLoggedOut() {
    this.toastrService.success('Successfully logged out!');
  }
}
