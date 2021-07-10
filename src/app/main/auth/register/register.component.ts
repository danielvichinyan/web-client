import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '../constants';
import { RegisterRequest } from '../payload/register.request';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private $destroy: Subject<boolean> = new Subject<boolean>();
  public registerForm: FormGroup;
  public isSuccessful: boolean = false;
  public minLength: number = 3;
  public maxLength: number = 20;
  public user: RegisterRequest = new RegisterRequest();

  constructor(
    private userService: UserService, 
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    /* Form build and validations. */
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      firstName: ['', [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]],
      lastName: ['', [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]],
      bornOn: ['', Validators.required]
    })
  }

  /**
  * Get the controls of the register form.
  * 
  * @returns the controls of the registration forms.
  */
  get f() { return this.registerForm.controls }

  register(): void {
    this.user = this.registerForm.value;
    
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
