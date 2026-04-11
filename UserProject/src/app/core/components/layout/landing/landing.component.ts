import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ClassEntity } from '../../../../models/class.model';
import { Department } from '../../../../models/department.model';
import { ClassService } from '../../../../services/class.service';
import { DepartmentService } from '../../../../services/department.service';
import { forkJoin } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit {
  classes: ClassEntity[] = [];
  departments: Department[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private readonly classService: ClassService,
    private readonly departmentService: DepartmentService,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadHomeData();
    } else {
      this.loading = false;
    }
  }

  loadHomeData(): void {
    this.loading = true;
    this.errorMessage = '';
    forkJoin({
      classData: this.classService.getAll(),
      deptData: this.departmentService.getAll(),
    }).subscribe({
      next: ({ classData, deptData }) => {
        this.classes = classData;
        this.departments = deptData;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to load dashboard data.';
      },
    });
  }
}
