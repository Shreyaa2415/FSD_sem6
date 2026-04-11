import { Department } from './department.model';

export type ClassroomType = 'CLASS' | 'LAB' | 'COMMON_ROOM';

export interface ClassEntity {
  classId: number;
  section: string;
  department: Department | null;
  capacity: number;
  area: number;
  classroomType: ClassroomType;
}

export interface ClassCreateRequest {
  section: string;
  department: {
    deptId: number;
  };
  capacity: number;
  area: number;
  classroomType: ClassroomType;
}

export interface ClassUpdateRequest {
  section?: string;
  department?: {
    deptId: number;
  };
  capacity?: number;
  area?: number;
  classroomType?: ClassroomType;
}
