import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginRequest } from '../payload/login.request';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private $destroy: Subject<boolean> = new Subject<boolean>();
  public user: LoginRequest = new LoginRequest();

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(): void { 
    this.userService.login(this.user)
    .pipe(
      takeUntil(this.$destroy)
    )
    .subscribe(response => {
      console.log(response.headers);
      localStorage.setItem('token', response.headers.get('Authorization')!.replace('Bearer ', '').trim());
      console.log(localStorage);
      this.router.navigate(['landing']);
    })
  }

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.complete();
  }
}