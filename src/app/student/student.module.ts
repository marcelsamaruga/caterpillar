import { DailyTasksPage } from './daily-tasks/daily-tasks.page';
import { StudentDetailPage } from './student-detail/student-detail.page';
import { PhotosPage } from './photos/photos.page';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { StudentPage } from "./student.page";

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
        loadChildren: './daily-tasks/daily-tasks.module#DailyTasksPageModule'
      },
      {
        path: ":studentId",
        loadChildren: './daily-tasks/daily-tasks.module#DailyTasksPageModule'
      }
    ]
  },
  {
    path: "student-detail",
    children: [
      {
        path: "new",
        loadChildren: './student-detail/student-detail.module#StudentDetailPageModule'
      },
      {
        path: ":studentId",
        loadChildren: './student-detail/student-detail.module#StudentDetailPageModule'
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
  declarations: [StudentPage]
})
export class StudentPageModule {}
