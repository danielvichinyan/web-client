import { OverlayRef } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProgressSpinnerComponent } from '../../common-components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerService } from '../../common-components/progress-spinner/progress-spinner.service';
import { LectureResponse } from '../payload/lecture.response';
import { LectureService } from '../services/lecture.service';

@Component({
  selector: 'app-lecture-view',
  templateUrl: './lecture-view.component.html',
  styleUrls: ['./lecture-view.component.scss'],
})
export class LectureViewComponent implements OnInit, OnDestroy {

  public lectureName: string;
  private $destroy: Subject<boolean> = new Subject<boolean>();
  public overlayRef: OverlayRef;
  public lectureResponse: LectureResponse;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lectureService: LectureService,
    private progressSpinnerService: ProgressSpinnerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.lectureName = params['name'];
    });

    this.getViewLecture(this.lectureName);
  }

  public getViewLecture(name: string) {
    return this.lectureService
      .getViewLecture(name)
      .pipe(takeUntil(this.$destroy))
      .subscribe((response) => {
        this.lectureResponse = response;
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
