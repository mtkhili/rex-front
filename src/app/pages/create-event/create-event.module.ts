import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { IonicModule } from '@ionic/angular';

import { CreateEventPage } from './create-event.page';

import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';


const routes: Routes = [
  {
    path: '',
    component: CreateEventPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    Ionic4DatepickerModule
  ],
  declarations: [CreateEventPage]
})
export class CreateEventPageModule {}
