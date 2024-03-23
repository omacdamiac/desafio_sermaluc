import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CatalogueComponent, HomeComponent } from '../../pages';
import { LIBRARY } from '@shared/constants';

const routes: Routes = [
  {
    path: LIBRARY.ZERO,
    component: DashboardComponent,
    children: [
      { path: LIBRARY.ZERO, redirectTo: LIBRARY.ROUTE_HOME, pathMatch: "full" },
      { path: LIBRARY.ROUTE_CATALOGO, component: CatalogueComponent },
      { path: LIBRARY.ROUTE_HOME, component: HomeComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
