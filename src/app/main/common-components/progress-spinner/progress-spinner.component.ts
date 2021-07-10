import { Component, OnInit, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnInit {

  @Input() public showProgressSpinnner: boolean;

  constructor() { }

  ngOnInit() {
  }
}

@NgModule({
  declarations: [ProgressSpinnerComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ProgressSpinnerComponent]
})
export class ProgressSpinnerModule {

}
