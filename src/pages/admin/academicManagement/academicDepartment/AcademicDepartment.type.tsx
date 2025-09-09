import type { TAcademicFaculty } from "../academicFaculty/academicFaculty.type";
import type { TMeta } from "../academicManagement.type";

export type TAcademicDepaetment = {
  _id: string;
  name: string;
  academicFaculty: TAcademicFaculty;
  createdAt?: string;
  updatedAt?: string;
};

export type TAcademicDepartmentResponse = {
  data: TAcademicDepaetment[];
  meta?: TMeta;
};
