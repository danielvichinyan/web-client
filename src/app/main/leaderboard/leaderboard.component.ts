import { OverlayRef } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProgressSpinnerComponent } from '../common-components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerService } from '../common-components/progress-spinner/progress-spinner.service';
import { ProfileResponse } from '../profile/payload/profile.response';
import { ProfileService } from '../profile/services/profile-service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit, OnDestroy {

  private $destroy: Subject<boolean> = new Subject<boolean>();
  public userProfilesList: ProfileResponse[] = [];
  public overlayRef: OverlayRef;
  public name: string;
  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['firstName', 'lastName', 'quizPoints'];
  public resultsLength: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private toastrService: ToastrService,
    private progressSpinnerService: ProgressSpinnerService
  ) {}

  ngOnInit(): void {
    this.getUserProfileList();
  }

  public getUserProfileList(): void {
    this.openProgressSpinner();
    this.profileService
      .getUserProfiles()
      .pipe(takeUntil(this.$destroy))
      .subscribe((response) => {
        response.forEach(
          user => this.userProfilesList.push(user)
        )

        this.dataSource.data = this.userProfilesList;
        this.resultsLength = this.userProfilesList.length;
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
    this.$destroy.next(true);
    this.$destroy.complete();
  }

}
