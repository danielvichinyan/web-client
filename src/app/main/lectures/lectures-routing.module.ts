import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLectureComponent } from './add-lecture/add-lecture.component';
import { LectureViewComponent } from './lecture-view/lecture-view.component';
import { LecturesListComponent } from './lectures-list/lectures-list.component';

const routes: Routes = [
  { 
    path: 'lectures', 
    component: LecturesListComponent 
  },
  {
    path: 'lecture/:name',
    component: LectureViewComponent
  },
  {
    path: 'add-lecture',
    component: AddLectureComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LecturesRoutingModule { }