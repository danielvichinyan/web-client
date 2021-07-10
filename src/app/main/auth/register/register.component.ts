import { OverlayRef } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProgressSpinnerComponent } from '../../common-components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerService } from '../../common-components/progress-spinner/progress-spinner.service';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '../constants';
import { RegisterRequest } from '../payload/register.request';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

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
  public overlayRef: OverlayRef;

  constructor(
    private userService: UserService, 
    private router: Router,
    private formBuilder: FormBuilder,
    private progressSpinnerService: ProgressSpinnerService,
    private toastrService: ToastrService
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

  public register(): void {
    this.openProgressSpinner();
    this.user = this.registerForm.value;
    
    this.userService
      .register(this.user)
      .pipe(takeUntil(this.$destroy))
      .subscribe(response => {
        this.showSuccess();
        this.progressSpinnerService.close(this.overlayRef);
        this.router.navigate(['login'])
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
    this.toastrService.success('Successfully registered!');
  }

  public showError(): void {
    this.toastrService.error('Please fill in and check all fields!');
  }

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.complete();
  }
}
