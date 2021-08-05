import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { ProgressSpinnerComponent, ProgressSpinnerModule } from '../common-components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerService } from '../common-components/progress-spinner/progress-spinner.service';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizViewComponent } from './quiz-view/quiz-view.component';
import { QuizzesRoutingModule } from './quizzes-routing.module';
import { AddQuizComponent } from './add-quiz/add-quiz.component';

@NgModule({
  declarations: [
    QuizListComponent,
    QuizViewComponent,
    AddQuizComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    QuizzesRoutingModule,
    ProgressSpinnerModule
  ], 
  entryComponents: [
    ProgressSpinnerComponent
  ],
  providers: [
    ProgressSpinnerService
  ]
})
export class QuizzesModule { }