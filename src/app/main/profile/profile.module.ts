import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ViewProfileComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }