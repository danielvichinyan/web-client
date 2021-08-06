import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizViewComponent } from './quiz-view/quiz-view.component';

const routes: Routes = [
  { 
    path: 'quizzes', 
    component: QuizListComponent 
  },
  {
    path: 'quiz/:name',
    component: QuizViewComponent
  },
  {
    path: 'add-quiz',
    component: AddQuizComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizzesRoutingModule { }