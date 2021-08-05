import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
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

    constructor(private fb: FormBuilder, private quizService: QuizService) {}

    ngOnInit() {
        this.addQuizForm = this.fb.group({
            name: [''],
            description: [''],
            answer: [''],
            reward: [''],
            category: ['']
        });
    }

    collectAddQuizFormData(): QuizRequest {
        return this.addQuizForm.value;
    }

    addNewQuiz() {
        const quiz = this.collectAddQuizFormData();
        this.quizService.addQuiz(quiz).subscribe();
    }
}