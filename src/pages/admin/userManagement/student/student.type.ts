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
  id: string;
  _id: string;
  name: UserName;
  email: string;
  admissionSemester: { name: string };
  academicDepartment: { name: string };
  academicFaculty: { name: string };
  profileImage?: string;
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

// export type TStudent = {
//   //   student: any;
//   _id: string;
//   name: {
//     firstName: string;
//     middleName?: string | null;
//     lastName?: string | null;
//   };
//   email?: string;
//   gender?: string;
//   dateOfBirth?: string;
//   contactNo?: string;
//   emergencyContactNo?: string;
//   bloodGroup?: string;
//   permanentAddress?: string;
//   profileImage?: string;
//   presentAddress?: string;
//   guardian?: Guardian;
//   localGuardian?: LocalGuardian;
//   admissionSemester?: { _id?: string | undefined; name: string };
//   academicDepartment?: { _id?: string; name: string };
//   academicFaculty?: { _id?: string; name: string };
// };

export type TStudentApiResponse = {
  data: TStudent[];
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
};

export type TStudentRow = {
  id: string;
  name: string;
  admissionSemester: string;
  academicDepartment: string;
  academicFaculty: string;
  profileImage: string;
};
