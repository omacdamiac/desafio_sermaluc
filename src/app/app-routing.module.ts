import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LIBRARY } from '@shared/constants';

const routes: Routes = [
  { path: LIBRARY.ZERO, redirectTo: LIBRARY.ZERO, pathMatch: "full" },
  {
    path: LIBRARY.ZERO,
    loadChildren: () =>
      import("./ui/views/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
