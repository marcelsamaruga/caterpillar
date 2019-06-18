import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "student", pathMatch: "full" },
  {
    path: "student",
    loadChildren: "./student/student.module#StudentPageModule"
  },
  { path: "auth", loadChildren: "./auth/auth.module#AuthPageModule" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
