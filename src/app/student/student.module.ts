import { StudentDetailPage } from './student-detail/student-detail.page';
import { PhotosPage } from './photos/photos.page';
import { PhotosRoutingModule } from './photos/photos-routing.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { StudentPage } from "./student.page";
import { DailyTasksPage } from './daily-tasks/daily-tasks.page';

const routes: Routes = [
  {
    path: "",
    component: StudentPage
  },
  {
    path: "photos",
    children: [
      {
        path: "",
        loadChildren: './photos/photos.module#PhotosPageModule'
      },
      {
        path: ":studentId",
        loadChildren: './photos/photos.module#PhotosPageModule'
      }
    ]
  },
  {
    path: "daily-tasks",
    children: [
      {
        path: "",
        loadChildren: './daily-tasks/daily-tasks.module#DailyTasksModule'
      },
      {
        path: ":studentId",
        loadChildren: './photos/photos.module#DailyTasksModule'
      }
    ]
  },
  {
    path: "student-detail",
    children: [
      {
        path: "",
        loadChildren: './photos/photos.module#DailyTasksModule'
      },
      {
        path: ":studentId",
        loadChildren: './photos/photos.module#DailyTasksModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudentPage, DailyTasksPage, StudentDetailPage]
})
export class StudentPageModule {}
