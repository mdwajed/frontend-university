export type UserName = {
  firstName: string;
  middleName?: string | null;
  lastName?: string | null;
};
export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  data: any;
  id: string;
  _id: string;
  message: any;
  name: UserName;
  email: string;
  admissionSemester: { name: string };
  academicDepartment: { name: string };
  academicFaculty: { name: string };
  profileImage?: string;
  contactNo: string;
  emergencyContactNo: string;
  gender: string;
  dateOfBirth?: string;
  bloodGroup: string;
  permanentAddress: string;
  presentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  student: {
    academicFaculty: any;
    _id?: string;
    name: UserName;
    email: string;
    gender: string;
    dateOfBirth?: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup: string;
    permanentAddress: string;
    profileImage?: string;
    presentAddress: string;
    guardian: Guardian;
    localGuardian: LocalGuardian;
    admissionSemester: string;
    academicDepartment: string;
  };
};

export type TStudentApiResponse = {
  data: TStudent[];
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
};

export type TStudentRow = {
  _id: string;
  id: string;
  email?: string;
  gender?: string;
  dateOfBirth?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  bloodGroup?: string;
  permanentAddress?: string;
  presentAddress?: string;
  guardian: string;
  localGuardian: string;
  name: string;
  admissionSemester: string;
  academicDepartment: string;
  academicFaculty: string;
  profileImage: string;
};
