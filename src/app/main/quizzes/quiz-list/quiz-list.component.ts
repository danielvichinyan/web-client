import { OverlayRef } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProgressSpinnerComponent } from '../../common-components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerService } from '../../common-components/progress-spinner/progress-spinner.service';
import { QuizResponse } from '../payload/quiz.response';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit, OnDestroy {

  private $destroy: Subject<boolean> = new Subject<boolean>();
  public quizList: QuizResponse[] = [];
  public overlayRef: OverlayRef;
  public name: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private toastrService: ToastrService,
    private progressSpinnerService: ProgressSpinnerService
  ) {}

  ngOnInit(): void {
    this.getQuizList();

    this.route.params.subscribe(params => {
      this.name = params['name'];
    });
  }

  public getQuizList(): void {
    this.openProgressSpinner();
    this.quizService
      .getAllQuizzes()
      .pipe(takeUntil(this.$destroy))
      .subscribe((response) => {
        response.forEach(
          quiz => this.quizList.push(quiz)
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
