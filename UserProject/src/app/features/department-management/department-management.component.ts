import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Department } from '../../models/department.model';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-department-management',
  templateUrl: './department-management.component.html',
  styleUrl: './department-management.component.css',
  standalone: false,
})
export class DepartmentManagementComponent implements OnInit {
  departments: Department[] = [];
  selectedDepartment: Department | null = null;

  newDeptName = '';
  searchDeptId: number | null = null;

  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private readonly departmentService: DepartmentService,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchAllDepartments();
    }
  }

  fetchAllDepartments(): void {
    this.loading = true;
    this.clearMessages();
    this.departmentService.getAll().subscribe({
      next: (data) => {
        this.departments = data;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = this.readError(error, 'Unable to fetch departments.');
      },
    });
  }

  addDepartment(): void {
    const deptName = this.newDeptName.trim();
    if (!deptName) {
      this.errorMessage = 'Department name is required.';
      return;
    }

    this.loading = true;
    this.clearMessages();
    this.departmentService.add({ deptName }).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Department added successfully.';
        this.newDeptName = '';
        this.fetchAllDepartments();
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = this.readError(error, 'Unable to add department.');
      },
    });
  }

  getDepartmentById(): void {
    if (this.searchDeptId == null) {
      this.errorMessage = 'Department id is required.';
      return;
    }

    this.loading = true;
    this.clearMessages();
    this.departmentService.getById(this.searchDeptId).subscribe({
      next: (data) => {
        this.loading = false;
        this.selectedDepartment = data;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.selectedDepartment = null;
        this.errorMessage = this.readError(error, 'Department not found.');
      },
    });
  }

  deleteDepartment(deptId: number): void {
    this.loading = true;
    this.clearMessages();
    this.departmentService.deleteById(deptId).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = `Department ${deptId} deleted successfully.`;
        this.fetchAllDepartments();
        if (this.selectedDepartment?.deptId === deptId) {
          this.selectedDepartment = null;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = this.readError(error, 'Unable to delete department.');
      },
    });
  }

  private clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }

  private readError(error: HttpErrorResponse, fallback: string): string {
    if (typeof error.error === 'string' && error.error.trim()) {
      return error.error;
    }
    return fallback;
  }
}
