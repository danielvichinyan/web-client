import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { ProgressSpinnerComponent, ProgressSpinnerModule } from '../progress-spinner/progress-spinner.component';
import { ProgressSpinnerService } from '../progress-spinner/progress-spinner.service';
import { VideoPlayerComponent } from './video-player.component';
import { VgBufferingModule, VgControlsModule, VgCoreModule, VgOverlayPlayModule } from 'ngx-videogular';

@NgModule({
  declarations: [
    VideoPlayerComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    ProgressSpinnerModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ], 
  entryComponents: [
    ProgressSpinnerComponent
  ],
  providers: [
    ProgressSpinnerService
  ],
  exports: [
    VideoPlayerComponent
  ]
})
export class VideoPlayerModule { }