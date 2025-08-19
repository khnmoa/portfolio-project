import { Routes } from '@angular/router';
import { PublicLayout } from './pages/layout/public-layout/public-layout';
import { pagesRoutes } from './pages/pages.routes';
import { DashboardLayout } from './dashboard/layout/dashboard-layout/dashboard-layout';
import { dashboardRoutes } from './dashboard/dashboard.routes';


export const routes: Routes = [
  {
    path: '', 
    component:PublicLayout,
    children:pagesRoutes
   },
  {
    path: 'dashboard',
    component:DashboardLayout,
    children: dashboardRoutes
  }
];

