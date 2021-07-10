import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizViewComponent } from './quiz-view/quiz-view.component';

const routes: Routes = [
  { 
    path: 'quizzes', 
    component: QuizListComponent 
  },
  {
    path: 'quiz',
    component: QuizViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizzesRoutingModule { }