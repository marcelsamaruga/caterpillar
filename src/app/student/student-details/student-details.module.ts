import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentDetailsPage } from './student-details.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageController } from '../../shared/message-controller';

const routes: Routes = [
  {
    path: '',
    component: StudentDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [MessageController],
  declarations: [StudentDetailsPage]
})
export class StudentDetailsPageModule {}
