import { OverlayRef } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { ProgressSpinnerComponent } from '../../common-components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerService } from '../../common-components/progress-spinner/progress-spinner.service';
import { LoginRequest } from '../payload/login.request';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

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
  public overlayRef: OverlayRef;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private progressSpinnerService: ProgressSpinnerService,
    private toastrService: ToastrService
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

  public login(): void { 
    this.openProgressSpinner();
    this.user = this.loginForm.value;
    this.submitted = true;
    
    this.userService.login(this.user)
    .pipe(
      first()
    )
    .subscribe(response => {
      this.userService.isLoggedIn = true;
      this.router.navigate(['welcome']);

      this.showSuccess();
      this.progressSpinnerService.close(this.overlayRef);
    }, 
    (error) => {
      this.showError();
      this.progressSpinnerService.close(this.overlayRef);
    });
  }

  public openProgressSpinner(): void {
    this.overlayRef = this.progressSpinnerService.open(
        { hasBackdrop: true },
        ProgressSpinnerComponent
    );
  } 

  public showSuccess(): void {
    this.toastrService.success('Successfully logged in!');
  }

  public showError(): void {
    this.toastrService.error('Invalid login! Please check your login credentials!');
  }

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.complete();
  }
}