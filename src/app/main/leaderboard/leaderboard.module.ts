import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { ProgressSpinnerComponent, ProgressSpinnerModule } from '../common-components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerService } from '../common-components/progress-spinner/progress-spinner.service';
import { LeaderboardComponent } from './leaderboard.component';

@NgModule({
  declarations: [
    LeaderboardComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    ProgressSpinnerModule
  ], 
  entryComponents: [
    ProgressSpinnerComponent
  ],
  providers: [
    ProgressSpinnerService
  ]
})
export class LeaderboardModule { }