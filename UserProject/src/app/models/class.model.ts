import { Department } from './department.model';

export interface ClassEntity {
  classId: number;
  section: string;
  department: Department | null;
}

export interface ClassCreateRequest {
  section: string;
  department: {
    deptId: number;
  };
}

export interface ClassUpdateRequest {
  section: string;
  department?: {
    deptId: number;
  };
}
