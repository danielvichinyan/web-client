import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
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

  public newProfile: ProfileResponse = new ProfileResponse();

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    /* Login form validations. (only required currently) */
    this.editProfileForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      bornOn: ['', [Validators.required]],
    });

    this.profileService.viewProfile().subscribe(response => {
      this.profile = response;
    });
  }

  /**
  * Get the controls of the login form.
  * 
  * @returns the controls of the login form
  */
   get f() { return this.editProfileForm.controls }

  editProfile(): void {
    this.profileService.editProfile(this.profile).subscribe(response => {
      this.newProfile = response;
      this.profile = this.newProfile;
    });
  }

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.complete();
  }
}
