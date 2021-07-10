import { OverlayRef } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProgressSpinnerComponent } from '../../common-components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerService } from '../../common-components/progress-spinner/progress-spinner.service';
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
  public overlayRef: OverlayRef;

  constructor(
    private profileService: ProfileService,
    private progressSpinnerService: ProgressSpinnerService
  ) { }

  ngOnInit(): void {
    this.openProgressSpinner();
    this.profileService.viewProfile().subscribe(response => {
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}