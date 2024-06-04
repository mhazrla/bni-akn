import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { DashboardComponent } from './dashboards/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./dashboards/dashboards.module').then((m) => m.DashboardsModule),
  },
  {
    path: 'invoices',
    loadChildren: () =>
      import('./invoices/invoices.module').then((m) => m.InvoicesModule),
  },
  {
    path: 'ui',
    loadChildren: () => import('./ui/ui.module').then((m) => m.UiModule),
  },
  {
    path: 'advance-ui',
    loadChildren: () =>
      import('./advance-ui/advance-ui.module').then((m) => m.AdvanceUiModule),
  },
  {
    path: 'forms',
    loadChildren: () => import('./form/form.module').then((m) => m.FormModule),
  },
  {
    path: 'user-data',
    loadChildren: () =>
      import('./user-data/user-data.module').then((m) => m.UserDataModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
