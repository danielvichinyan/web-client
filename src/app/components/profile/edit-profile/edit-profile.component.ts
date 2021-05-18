import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileRequest } from '../payload/profile.request';
import { ProfileResponse } from '../payload/profile.response';
import { ProfileService } from '../services/profile-service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy  {

  public editProfileUser: ProfileRequest = new ProfileRequest();
  
  private subscription = new Subscription();

  public profile: ProfileResponse = {
    firstName: '',
    lastName: '',
    bornOn: new Date(),
    email: ''
  };
  
  constructor(
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.profileService.viewProfile().subscribe(response => {
      this.profile = response;
    });
  }

  editProfile(): void {
    this.profileService.editProfile(this.editProfileUser).subscribe(response => {
      this.profile = response,
      this.router.navigate(['/view-profile'])
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}