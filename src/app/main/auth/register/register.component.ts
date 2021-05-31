import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RegisterRequest } from '../payload/register.request';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private $destroy: Subject<boolean> = new Subject<boolean>();
  public user: RegisterRequest = new RegisterRequest();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  register(): void {
    this.userService
      .register(this.user)
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => this.router.navigate(['login']));
  }

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.complete();
  }
}
