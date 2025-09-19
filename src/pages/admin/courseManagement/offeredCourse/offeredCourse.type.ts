export interface IOfferedCourse {
  semesterRegistration: string;
  academicDepartment: string;
  academicFaculty: string;
  course: string;
  faculty: string;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
}

export const weekdays = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

export const daysOptions = weekdays.map((day) => ({
  value: day,
  label: day,
}));
