import { OverlayRef } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { ProgressSpinnerComponent } from '../../common-components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerService } from '../../common-components/progress-spinner/progress-spinner.service';
import { ProfileRequest } from '../payload/profile.request';
import { ProfileResponse } from '../payload/profile.response';
import { ProfileService } from '../services/profile-service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  public profile: ProfileRequest = new ProfileRequest();
  private $destroy: Subject<boolean> = new Subject<boolean>();
  public editProfileForm: FormGroup;
  public submitted: boolean = false;
  public overlayRef: OverlayRef;

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private progressSpinnerService: ProgressSpinnerService
  ) { }

  ngOnInit(): void {
    this.profileService.viewProfile().subscribe(response => {
      this.profile = response;
    });

    /* Login form validations. (only required currently) */
    this.editProfileForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      bornOn: ['', [Validators.required]],
    });
  }

  /**
  * Get the controls of the login form.
  * 
  * @returns the controls of the login form
  */
  public get f() { return this.editProfileForm.controls }

  public editProfile(): void {
    this.openProgressSpinner();
    this.profileService.editProfile(this.profile).subscribe(response => {
      this.profile = response;

      this.progressSpinnerService.close(this.overlayRef);
    });
  }

  public openProgressSpinner(): void {
    this.overlayRef = this.progressSpinnerService.open(
      { hasBackdrop: true },
      ProgressSpinnerComponent
    );
  }

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.complete();
  }
}
