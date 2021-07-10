import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/main/auth/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isUserLoggedIn: boolean = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.isUserLoggedIn = this.userService.isLoggedIn;
      }
    })
  }
  
  navigateToWelcome() {
    this.router.navigate(['welcome']);
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }

  navigateToProfile() {
    this.router.navigate(['profile']);
  }

  navigateToLectures() {
    this.router.navigate(['lectures']);
  }

  logout() {
    this.isUserLoggedIn = false;
    this.userService.isLoggedIn = false;
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }
}
