import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { ProgressSpinnerComponent, ProgressSpinnerModule } from '../common-components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerService } from '../common-components/progress-spinner/progress-spinner.service';
import { LectureViewComponent } from './lecture-view/lecture-view.component';
import { LecturesListComponent } from './lectures-list/lectures-list.component';
import { LecturesRoutingModule } from './lectures-routing.module';
import { AddLectureComponent } from './add-lecture/add-lecture.component';
import { VideoPlayerModule } from '../common-components/video-player/video-player.module';

@NgModule({
  declarations: [
    LectureViewComponent,
    LecturesListComponent,
    AddLectureComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    LecturesRoutingModule,
    ProgressSpinnerModule,
    VideoPlayerModule
  ], 
  entryComponents: [
    ProgressSpinnerComponent
  ],
  providers: [
    ProgressSpinnerService
  ]
})
export class LecturesModule { }