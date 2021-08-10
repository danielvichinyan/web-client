import { OverlayRef } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProgressSpinnerComponent } from '../../common-components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerService } from '../../common-components/progress-spinner/progress-spinner.service';
import { LectureResponse } from '../payload/lecture.response';
import { LectureService } from '../services/lecture.service';

@Component({
  selector: 'app-lectures-list',
  templateUrl: './lectures-list.component.html',
  styleUrls: ['./lectures-list.component.scss'],
})
export class LecturesListComponent implements OnInit, OnDestroy {

  private $destroy: Subject<boolean> = new Subject<boolean>();
  public lectureList: LectureResponse[] = [];
  public overlayRef: OverlayRef;
  public name: string;
  public filename: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lectureService: LectureService,
    private toastrService: ToastrService,
    private progressSpinnerService: ProgressSpinnerService
  ) {}

  ngOnInit(): void {
    this.getLectureList();

    this.route.params.subscribe(params => {
      this.name = params['name'];
    });
  }

  public getLectureList(): void {
    this.openProgressSpinner();
    this.lectureService
      .getAllLectures()
      .pipe(takeUntil(this.$destroy))
      .subscribe((response) => {
        response.forEach(
          lecture => this.lectureList.push(lecture)
        )
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
