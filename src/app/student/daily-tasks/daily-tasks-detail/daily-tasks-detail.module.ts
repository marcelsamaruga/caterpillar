import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DailyTasksDetailPage } from './daily-tasks-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DailyTasksDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DailyTasksDetailPage]
})
export class DailyTasksDetailPageModule {}
