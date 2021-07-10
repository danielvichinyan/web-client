import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { LoginRequest } from '../payload/login.request';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private $destroy: Subject<boolean> = new Subject<boolean>();
  public loginForm: FormGroup;
  public submitted: boolean = false;
  public user: LoginRequest = new LoginRequest();

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    /* Login form validations. (only required currently) */
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  /**
  * Get the controls of the login form.
  * 
  * @returns the controls of the login form
  */
  get f() { return this.loginForm.controls }

  login(): void { 
    this.user = this.loginForm.value;
    this.submitted = true;
    
    this.userService.login(this.user)
    .pipe(
      first()
    )
    .subscribe(response => {
      this.userService.isLoggedIn = true;
      this.router.navigate(['welcome']);
    })
  }

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.complete();
  }
}