import type { TFaculty } from "../../userManagement/faculty/faculty.type";

export interface ICourse {
  _id: string;
  data?: ICourse;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: PreRequisiteCourse[];
}

export interface PreRequisiteCourse {
  course: string | ICourse;
  isDeleted: boolean;
}

export interface IPagination<T> {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T[];
}

export interface TCourseModelProps {
  open: boolean;
  onClose: () => void;
  course?: ICourse;
  courseId?: string | null;
  faculty?: string | null;
}
export interface IAssignFaculties {
  faculties: TFaculty[];
  courseId: string;
}

export interface IFacultyName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface IFaculty {
  _id: string;
  id: string;
  user: string;
  designation: string;
  name: IFacultyName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  academicDepartment: string;
  academicFaculty: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  fullName: string;
}
