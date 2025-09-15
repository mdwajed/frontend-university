import type { TMeta } from "../../academicManagement/academicManagement.type";
import type { TAcademicSemester } from "../../academicManagement/academicSemester/academicSemester.constant";

export const semesterStatusOptions = [
  { value: "UPCOMING", label: "Upcoming" },
  { value: "ONGOING", label: "Ongoing" },
  { value: "ENDED", label: "Ended" },
];
export const semesterOptions = [
  { value: "01", label: "Autumn" },
  { value: "02", label: "Summer" },
  { value: "03", label: "Fall" },
];

export type TRegisteredSemester = {
  _id: string;
  academicSemester: TAcademicSemester;
  status: string;
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
};

export type TRegisteredSemesterResponse = {
  data: TRegisteredSemester[];
  meta?: TMeta;
};

export type TRegisteredSemesterRow = {
  _id: string;
  semesterName: string;
  status: string;
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
};
