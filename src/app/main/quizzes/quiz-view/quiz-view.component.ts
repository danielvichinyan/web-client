import { OverlayRef } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProgressSpinnerComponent } from '../../common-components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerService } from '../../common-components/progress-spinner/progress-spinner.service';
import { ProfileResponse } from '../../profile/payload/profile.response';
import { ProfileService } from '../../profile/services/profile-service';
import { UserGainPointsRequestModel } from '../payload/profile-points.request';
import { QuizResponse } from '../payload/quiz.response';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.scss'],
})
export class QuizViewComponent implements OnInit {
  public answerQuizForm: FormGroup;
  public quizName: string;
  private $destroy: Subject<boolean> = new Subject<boolean>();
  public overlayRef: OverlayRef;
  public quizResponse: QuizResponse;
  public isQuizCompleted: boolean = false;
  public pointsAwarded: number;
  public profilePointsRequest: UserGainPointsRequestModel;
  public profile: ProfileResponse;
  public oldUserPoints: number;
  public isHintAlreadyShown: boolean = false;
  public hint: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private progressSpinnerService: ProgressSpinnerService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private profileService: ProfileService
  ) {
    // this.profilePointsRequest = new UserGainPointsRequestModel(0);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.quizName = params['name'];
    });

    this.getViewQuiz(this.quizName);

    this.answerQuizForm = this.fb.group({
      answer: [''],
    });
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

  public isAnswerValid(): boolean {
    if (this.quizResponse.answer === this.answerQuizForm.value['answer']) {
      this.isQuizCompleted = true;
      this.pointsAwarded += 20;
      this.toastrService.success(
        `Congratulations! You have completed the quiz! Reward: ${this.quizResponse.reward} points!`
      );
      this.getUserProfile(); // get the profile of the user and 
      this.updateUserQuizPoints(); // update their points
      return true;
    } else {
      this.isQuizCompleted = false;
      this.toastrService.error(`Ooops! Wrong answer! Try again!`);
    }

    return false;
  }

  public getUserProfile() {
    this.profileService.viewProfile().subscribe(response => {
      this.profile = response;
      this.profilePointsRequest!.quizPoints = this.profile.quizPoints + this.quizResponse.reward;
    });
  }

  public updateUserQuizPoints(): void {
    this.quizService
      .updateUserPoints(this.profilePointsRequest)
      .pipe(takeUntil(this.$destroy))
      .subscribe((response) => {
        this.profile = response;
        console.log(this.profilePointsRequest);
        console.log("Profile: " + this.profile.quizPoints);
      });
  }

  public showHint(): void {
    this.isHintAlreadyShown = true;
  }
}
