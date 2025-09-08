import type { TAcademicFaculty } from "../academicFaculty/academicFaculty.type";

// Semester options
export const nameOptions = [
  { value: "01", label: "Autumn" },
  { value: "02", label: "Summer" },
  { value: "03", label: "Fall" },
];

// Optional: Months
export const monthOptions = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export type TAcademicSemester = {
  _id: string;
  name: string;
  academicYear: string;
  startMonth: string;
  endMonth: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TMete = {
  total: number;
  limit: number;
  page: number;
};

export type TAcademicSemesterResponse = {
  data: TAcademicSemester[];
  meta?: TMete;
};
export type TAcademicFacultyResponse = {
  data: TAcademicFaculty[];
  meta?: TMete;
};

export type APIError = {
  data?: unknown;
  message: string;
  success?: boolean;
  errorMessages?: { path: string; message: string }[];
};

export type FilterArg = { name: string; value: string }[];

export type TQueryParam = {
  name: string;
  value: string;
};
