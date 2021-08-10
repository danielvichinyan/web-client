import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LandingComponent } from './landing/landing.component';
import { CarouselComponent } from '../main/common-components/carousel/carousel.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    LandingComponent, 
    CarouselComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }