import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department, DepartmentCreateRequest } from '../models/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private readonly baseUrl = '/api/department';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.baseUrl}/all`);
  }

  getById(deptId: number): Observable<Department> {
    return this.http.get<Department>(`${this.baseUrl}/${deptId}`);
  }

  add(payload: DepartmentCreateRequest): Observable<Department> {
    return this.http.post<Department>(`${this.baseUrl}/add`, payload);
  }

  deleteById(deptId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${deptId}`);
  }
}
