import { OverlayRef } from "@angular/cdk/overlay";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ProgressSpinnerComponent } from "../../common-components/progress-spinner/progress-spinner.component";
import { ProgressSpinnerService } from "../../common-components/progress-spinner/progress-spinner.service";
import { QuizRequest } from "../payload/quiz.request";
import { QuizService } from "../services/quiz.service";

@Component({
    selector: 'app-add-quiz',
    templateUrl: './add-quiz.component.html',
    styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {

    public addQuizForm: FormGroup;
    public categories = ['Maths', 'Physics', 'Programming'];
    public overlayRef: OverlayRef;

    constructor(
        private fb: FormBuilder, 
        private quizService: QuizService,
        private toastrService: ToastrService,
        private progressSpinnerService: ProgressSpinnerService,
        private router: Router
    ) {}

    ngOnInit() {
        this.addQuizForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            answer: ['', Validators.required],
            reward: ['', Validators.required],
            category: ['', Validators.required],
            hint: ['', Validators.required]
        });
    }

    collectAddQuizFormData(): QuizRequest {
        return this.addQuizForm.value;
    }

    public openProgressSpinner(): void {
        this.overlayRef = this.progressSpinnerService.open(
          { hasBackdrop: true },
          ProgressSpinnerComponent
        );
      }

    addNewQuiz() {
        this.openProgressSpinner();
        const quiz = this.collectAddQuizFormData();
        this.quizService.addQuiz(quiz).subscribe((response) => {
            this.router.navigate(['quizzes']);
            this.toastrService.success("Quiz added successfully!");
            this.progressSpinnerService.close(this.overlayRef);
        });
    }
}