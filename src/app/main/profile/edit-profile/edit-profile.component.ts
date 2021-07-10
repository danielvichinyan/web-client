import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  public newProfile: ProfileResponse = new ProfileResponse();

  private subscription = new Subscription();

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.profileService.viewProfile().subscribe(response => {
      this.profile = response;
    });
  }

  editProfile(): void {
    this.profileService.editProfile(this.profile).subscribe(response => {
      this.newProfile = response;
      this.profile = this.newProfile;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
