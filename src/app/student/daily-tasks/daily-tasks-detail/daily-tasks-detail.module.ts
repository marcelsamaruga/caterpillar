import { ActivitiesComponent } from "./activities/activities.component";
import { DiapersComponent } from "./diapers/diapers.component";
import { MealsComponent } from "./meals/meals.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { DailyTasksDetailPage } from "./daily-tasks-detail.page";
import { SleepingComponent } from "./sleeping/sleeping.component";

const routes: Routes = [
  {
    path: "",
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
  declarations: [
    DailyTasksDetailPage,
    MealsComponent,
    DiapersComponent,
    SleepingComponent,
    ActivitiesComponent
  ]
})
export class DailyTasksDetailPageModule {}
