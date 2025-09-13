export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TFaculty = {
  _id: string;
  id: string;
  name: TUserName;
  designation: string;
  profileImage: string;
  academicDepartment: { name: string };
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender: string;
  dateOfBirth: string;
  bloodGroup: string;
  permanentAddress: string;
  presentAddress: string;
  message: string;
  password: string;
  faculty: {
    id: string;
    designation: string;
    name: TUserName;
    gender: "male" | "female" | "other";
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
    presentAddress: string;
    permanentAddress: string;
    profileImage?: string;
    academicDepartment: {
      name: string;
    };
    isDeleted: boolean;
  };
};

export type TFacultyApiResponse = {
  data: TFaculty[];
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
};

export type TFacultyRow = {
  _id: string;
  id: string;
  designation: string;
  email?: string;
  gender?: string;
  dateOfBirth?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  bloodGroup?: string;
  permanentAddress?: string;
  presentAddress?: string;
  name: string;
  academicDepartment: string;
  profileImage: string;
};
