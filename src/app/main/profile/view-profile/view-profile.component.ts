import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileResponse } from '../payload/profile.response';
import { ProfileService } from '../services/profile-service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  private subscription = new Subscription();

  public profile: ProfileResponse = new ProfileResponse();

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.profileService.viewProfile().subscribe(response => {
      this.profile = response;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}