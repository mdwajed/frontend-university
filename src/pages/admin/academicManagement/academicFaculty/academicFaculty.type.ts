import type { TMeta } from "../academicManagement.type";

// Academic faculty name options
export const academicFacultyName = [
  { value: "01", label: "Faculty of Engineering" },
  { value: "02", label: "Faculty of Science" },
  { value: "03", label: "Faculty of Arts" },
  { value: "04", label: "Faculty of Social Science" },
  { value: "05", label: "Faculty of Business Studies" },
];

export type TAcademicFaculty = {
  _id: string;
  name: string;
};

export type TAcademicFacultyResponse = {
  data: TAcademicFaculty[];
  meta?: TMeta;
};
