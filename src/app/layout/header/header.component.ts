import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isUserLoggedIn: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isUserLoggedIn = !!localStorage.getItem('token');
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

  }
}
