import { OverlayRef } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProgressSpinnerComponent } from '../../common-components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerService } from '../../common-components/progress-spinner/progress-spinner.service';
import { LectureResponse } from '../payload/lecture.response';
import { FileService } from '../services/file.service';
import { LectureService } from '../services/lecture.service';

@Component({
  selector: 'app-lecture-view',
  templateUrl: './lecture-view.component.html',
  styleUrls: ['./lecture-view.component.scss'],
})
export class LectureViewComponent implements OnInit, OnDestroy {
  public lectureName: string;
  public filename: string;
  private $destroy: Subject<boolean> = new Subject<boolean>();
  public overlayRef: OverlayRef;
  public lectureResponse: LectureResponse;
  public video: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lectureService: LectureService,
    private progressSpinnerService: ProgressSpinnerService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.lectureName = params['name'];
    });
    this.filename = "file_example_MP4_480_1_5MG.mp4";
    this.getViewLecture(this.lectureName);
    this.getLectureVideo(this.filename);
  }

  public getLectureVideo(filename: string) {
    this.fileService
      .downloadFile(filename)
      .pipe(takeUntil(this.$destroy))
      .subscribe((response) => {
        this.video = response;
      });
  }

  public getViewLecture(name: string) {
    this.openProgressSpinner();
    this.lectureService
      .getViewLecture(name)
      .pipe(takeUntil(this.$destroy))
      .subscribe((response) => {
        this.lectureResponse = response;
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
