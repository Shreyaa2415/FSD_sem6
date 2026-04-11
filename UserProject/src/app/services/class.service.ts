import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassCreateRequest, ClassEntity, ClassUpdateRequest } from '../models/class.model';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private readonly baseUrl = '/api/class';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<ClassEntity[]> {
    return this.http.get<ClassEntity[]>(`${this.baseUrl}/all`);
  }

  getById(classId: number): Observable<ClassEntity> {
    return this.http.get<ClassEntity>(`${this.baseUrl}/getid/${classId}`);
  }

  add(payload: ClassCreateRequest): Observable<ClassEntity> {
    return this.http.post<ClassEntity>(`${this.baseUrl}/add`, payload);
  }

  update(classId: number, payload: ClassUpdateRequest): Observable<ClassEntity> {
    return this.http.put<ClassEntity>(`${this.baseUrl}/update/${classId}`, payload);
  }

  deleteById(classId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${classId}`);
  }
}
