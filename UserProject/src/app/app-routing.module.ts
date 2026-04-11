import { NgModule } from '@angular/core';
import { LandingComponent } from './core/components/layout/landing/landing.component';
import { RouterModule, Routes } from '@angular/router';
import { ClassManagementComponent } from './features/class-management/class-management.component';
import { DepartmentManagementComponent } from './features/department-management/department-management.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    data: {
      title: 'Home Page',
    },
  },
  {
    path: 'class',
    component: ClassManagementComponent,
    data: {
      title: 'Class Management',
    },
  },
  {
    path: 'department',
    component: DepartmentManagementComponent,
    data: {
      title: 'Department Management',
    },
  },

  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
