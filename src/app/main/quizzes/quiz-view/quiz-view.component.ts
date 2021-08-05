import { OverlayRef } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProgressSpinnerComponent } from '../../common-components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerService } from '../../common-components/progress-spinner/progress-spinner.service';
import { QuizResponse } from '../payload/quiz.response';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.scss']
})
export class QuizViewComponent implements OnInit {

  public quizName: string;
  private $destroy: Subject<boolean> = new Subject<boolean>();
  public overlayRef: OverlayRef;
  public quizResponse: QuizResponse;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private progressSpinnerService: ProgressSpinnerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.quizName = params['name'];
    });

    this.getViewQuiz(this.quizName);
  }

  public getViewQuiz(name: string) {
    this.openProgressSpinner();
    this.quizService
      .getViewQuiz(name)
      .pipe(takeUntil(this.$destroy))
      .subscribe((response) => {
        this.quizResponse = response;
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
