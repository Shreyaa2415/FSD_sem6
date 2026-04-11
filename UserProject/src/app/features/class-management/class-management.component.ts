import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import {
  ClassEntity,
  ClassCreateRequest,
  ClassUpdateRequest,
} from '../../models/class.model';
import { ClassService } from '../../services/class.service';
import { Department } from '../../models/department.model';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-class-management',
  templateUrl: './class-management.component.html',
  styleUrl: './class-management.component.css',
  standalone: false,
})
export class ClassManagementComponent implements OnInit {
  classes: ClassEntity[] = [];
  departments: Department[] = [];
  selectedClass: ClassEntity | null = null;

  addSection = '';
  addDeptId: number | null = null;

  updateClassId: number | null = null;
  updateSection = '';
  updateDeptId: number | null = null;

  searchClassId: number | null = null;

  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private readonly classService: ClassService,
    private readonly departmentService: DepartmentService,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchAllClasses();
      this.fetchDepartments();
    }
  }

  fetchAllClasses(): void {
    this.loading = true;
    this.clearMessages();
    this.classService.getAll().subscribe({
      next: (data) => {
        this.classes = data;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = this.readError(error, 'Unable to fetch classes.');
      },
    });
  }

  fetchDepartments(): void {
    this.departmentService.getAll().subscribe({
      next: (data) => {
        this.departments = data;
      },
      error: () => {
        this.errorMessage = 'Unable to load departments for class forms.';
      },
    });
  }

  addClass(): void {
    if (!this.addSection.trim() || this.addDeptId == null) {
      this.errorMessage = 'Section and department are required for add.';
      return;
    }

    const payload: ClassCreateRequest = {
      section: this.addSection.trim(),
      department: { deptId: this.addDeptId },
    };

    this.loading = true;
    this.clearMessages();
    this.classService.add(payload).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Class added successfully.';
        this.addSection = '';
        this.addDeptId = null;
        this.fetchAllClasses();
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = this.readError(error, 'Unable to add class.');
      },
    });
  }

  updateClass(): void {
    if (this.updateClassId == null || !this.updateSection.trim()) {
      this.errorMessage = 'Class id and section are required for update.';
      return;
    }

    const payload: ClassUpdateRequest = {
      section: this.updateSection.trim(),
    };
    if (this.updateDeptId != null) {
      payload.department = { deptId: this.updateDeptId };
    }

    this.loading = true;
    this.clearMessages();
    this.classService.update(this.updateClassId, payload).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = `Class ${this.updateClassId} updated successfully.`;
        this.updateSection = '';
        this.updateDeptId = null;
        this.fetchAllClasses();
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = this.readError(error, 'Unable to update class.');
      },
    });
  }

  getClassById(): void {
    if (this.searchClassId == null) {
      this.errorMessage = 'Class id is required.';
      return;
    }

    this.loading = true;
    this.clearMessages();
    this.classService.getById(this.searchClassId).subscribe({
      next: (data) => {
        this.loading = false;
        this.selectedClass = data;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.selectedClass = null;
        this.errorMessage = this.readError(error, 'Class not found.');
      },
    });
  }

  deleteClass(classId: number): void {
    this.loading = true;
    this.clearMessages();
    this.classService.deleteById(classId).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = `Class ${classId} deleted successfully.`;
        this.fetchAllClasses();
        if (this.selectedClass?.classId === classId) {
          this.selectedClass = null;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = this.readError(error, 'Unable to delete class.');
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
