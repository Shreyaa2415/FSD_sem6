import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './components/layout/landing/landing.component';
import { AdminShellComponent } from './components/layout/admin-shell/admin-shell.component';
import { ClassManagementComponent } from '../features/class-management/class-management.component';
import { DepartmentManagementComponent } from '../features/department-management/department-management.component';

@NgModule({
  declarations: [
    LandingComponent,
    AdminShellComponent,
    ClassManagementComponent,
    DepartmentManagementComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [
    LandingComponent,
    AdminShellComponent,
    ClassManagementComponent,
    DepartmentManagementComponent,
  ],
})
export class CoreModule {}
