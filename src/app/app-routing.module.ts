import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "auth", pathMatch: "full" },
  {
    path: "student",
    loadChildren: "./student/student.module#StudentPageModule"
  },
  { path: "auth", loadChildren: "./auth/auth.module#AuthPageModule" },  { path: 'filter-modal', loadChildren: './student/daily-tasks/filter-modal/filter-modal.module#FilterModalPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
