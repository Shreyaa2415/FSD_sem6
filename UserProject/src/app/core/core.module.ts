import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LandingComponent } from './components/layout/landing/landing.component';
import { AppRoutingModule } from '../app-routing.module';
import { AdminShellComponent } from './components/layout/admin-shell/admin-shell.component';
import { ClassManagementComponent } from '../features/class-management/class-management.component';
import { DepartmentManagementComponent } from '../features/department-management/department-management.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    AdminShellComponent,
    ClassManagementComponent,
    DepartmentManagementComponent,
  ],
  imports: [CommonModule, FormsModule, AppRoutingModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    AdminShellComponent,
    ClassManagementComponent,
    DepartmentManagementComponent,
  ],
})
export class CoreModule {}
