import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import {
  ClassEntity,
  ClassCreateRequest,
  ClassUpdateRequest,
  ClassroomType,
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
  addCapacity: number | null = null;
  addArea: number | null = null;
  addClassroomType: ClassroomType | null = null;

  updateClassId: number | null = null;
  updateSection = '';
  updateDeptId: number | null = null;
  updateCapacity: number | null = null;
  updateArea: number | null = null;
  updateClassroomType: ClassroomType | null = null;

  searchClassId: number | null = null;

  loading = false;
  successMessage = '';
  errorMessage = '';
  readonly classroomTypes: ClassroomType[] = ['CLASS', 'LAB', 'COMMON_ROOM'];

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
    if (
      !this.addSection.trim() ||
      this.addDeptId == null ||
      this.addCapacity == null ||
      this.addArea == null ||
      this.addClassroomType == null
    ) {
      this.errorMessage =
        'Section, department, capacity, area, and classroom type are required.';
      return;
    }
    if (this.addCapacity <= 0 || this.addArea <= 0) {
      this.errorMessage = 'Capacity and area must be greater than 0.';
      return;
    }

    const payload: ClassCreateRequest = {
      section: this.addSection.trim(),
      department: { deptId: this.addDeptId },
      capacity: this.addCapacity,
      area: this.addArea,
      classroomType: this.addClassroomType,
    };

    this.loading = true;
    this.clearMessages();
    this.classService.add(payload).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Class added successfully.';
        this.addSection = '';
        this.addDeptId = null;
        this.addCapacity = null;
        this.addArea = null;
        this.addClassroomType = null;
        this.fetchAllClasses();
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = this.readError(error, 'Unable to add class.');
      },
    });
  }

  updateClass(): void {
    if (this.updateClassId == null) {
      this.errorMessage = 'Class id is required for update.';
      return;
    }

    const payload: ClassUpdateRequest = {};
    if (this.updateSection.trim()) {
      payload.section = this.updateSection.trim();
    }
    if (this.updateDeptId != null) {
      payload.department = { deptId: this.updateDeptId };
    }
    if (this.updateCapacity != null) {
      payload.capacity = this.updateCapacity;
    }
    if (this.updateArea != null) {
      payload.area = this.updateArea;
    }
    if (this.updateClassroomType != null) {
      payload.classroomType = this.updateClassroomType;
    }

    if (
      (payload.capacity != null && payload.capacity <= 0) ||
      (payload.area != null && payload.area <= 0)
    ) {
      this.errorMessage = 'Updated capacity and area must be greater than 0.';
      return;
    }
    if (
      payload.section == null &&
      payload.department == null &&
      payload.capacity == null &&
      payload.area == null &&
      payload.classroomType == null
    ) {
      this.errorMessage = 'Provide at least one field to update.';
      return;
    }

    this.loading = true;
    this.clearMessages();
    this.classService.update(this.updateClassId, payload).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = `Class ${this.updateClassId} updated successfully.`;
        this.updateSection = '';
        this.updateDeptId = null;
        this.updateCapacity = null;
        this.updateArea = null;
        this.updateClassroomType = null;
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
