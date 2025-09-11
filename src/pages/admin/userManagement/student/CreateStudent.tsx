import { Button, Col, Divider, Row } from "antd";
import { type FieldValues, type SubmitHandler } from "react-hook-form";
import UniversityDatePicker from "../../../../components/form/UniversityDatePicker";
import UniversityForm from "../../../../components/form/UniversityForm";
import UniversityInput from "../../../../components/form/UniversityInput";
import UniversitySelect from "../../../../components/form/UniversitySelect";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicSemesterQuery,
} from "../../../../redux/features/admin/AcademicManagementApi";
import { useAddStudentMutation } from "../../../../redux/features/admin/userManagementApi";
import { BloodGroupOptions, GenderOptions } from "../usermanagemantType";
import ProfileImageInput from "./ProfileImageInput";
import type { TStudent } from "./student.type";

const studentDefaultValue = {
  student: {
    name: {
      firstName: "Student3",
      middleName: "Akter",
      lastName: "Jahan",
    },
    email: "student4@gmail.com",
    gender: "female",
    contactNo: "01644556677",
    emergencyContactNo: "01711223344",
    bloodGroup: "O-",
    permanentAddress: "Rajshahi, Bangladesh",
    // profileImage: "https://profileImage.jpg",
    presentAddress: "Motihar, Rajshahi",
    guardian: {
      fatherName: "Shah Alam",
      fatherOccupation: "Businessman",
      fatherContactNo: "01855667788",
      motherName: "Nazma Begum",
      motherOccupation: "Homemaker",
      motherContactNo: "01966778899",
    },
    localGuardian: {
      name: "Rashed Karim",
      occupation: "Lecturer",
      contactNo: "01533445566",
      address: "Boalia, Rajshahi",
    },
    admissionSemester: "68a9c7ce5ecaca93ca9b01c5",
    academicDepartment: "68a9bcbaf3158a9db25dfc0f",
    academicFaculty: "68a9bafef3158a9db25dfc0c",
  },
};

const CreateStudent = () => {
  const [addStudent, { data, error }] = useAddStudentMutation();

  console.log({ data, error });
  // query semesters
  const {
    data: semesterData,
    isFetching: isSemesterFetching,
    error: semesterError,
  } = useGetAllAcademicSemesterQuery();

  // query departments
  const academicSemesterOptions =
    semesterData?.data?.map((item) => ({
      label: ` ${item.name} ${item.academicYear}`,
      value: item._id,
    })) ?? [];

  const {
    data: departmentData,
    isFetching: isDepartmentFetching,
    error: departmentError,
  } = useGetAllAcademicDepartmentQuery();

  const academicDepartmentOptions =
    departmentData?.data?.map((item) => ({
      label: item.name,
      value: item._id,
    })) ?? [];

  const onSubmit: SubmitHandler<TStudent> = (data) => {
    console.log(data);
    const studentData = {
      password: "student123",
      student: data.student,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    // Append file if exists
    if (data.student.profileImage) {
      formData.append("file", data.student.profileImage);
    }
    addStudent(formData);
    console.log([...formData.entries()]);
  };
  return (
    <>
      <div className="text-2xl font-bold text-center">Student Intro Form</div>
      {semesterError && (
        <div style={{ color: "red" }}>Failed to load semesters.</div>
      )}
      {departmentError && (
        <div style={{ color: "red" }}> Failed to load departments.</div>
      )}
      <UniversityForm onSubmit={onSubmit} defaultValues={studentDefaultValue}>
        <Row justify="center" align="middle">
          <Col span={24} md={20} lg={16}>
            {/* Personal Info */}
            <Divider orientation="left" style={{ color: "green" }}>
              Personal Information
            </Divider>
            <Row gutter={16}>
              <Col span={12}>
                <UniversityInput<FieldValues>
                  label="First Name"
                  name="student.name.firstName"
                />
              </Col>
              <Col span={12}>
                <UniversityInput<FieldValues>
                  label="Last Name"
                  name="student.name.lastName"
                />
              </Col>
              <Col span={12}>
                <UniversityInput<FieldValues>
                  label="Email"
                  name="student.email"
                  type="email"
                />
              </Col>
              <Col span={12}>
                <UniversityInput<FieldValues>
                  label="Contact Number"
                  name="student.contactNo"
                  type="tel"
                />
              </Col>

              <Col span={12}>
                <UniversityDatePicker<FieldValues>
                  label="Date of Birth"
                  name="student.dateOfBirth"
                />
              </Col>
              <Col span={12}>
                <UniversityInput<FieldValues>
                  label="Emergency Contact Number"
                  name="student.emergencyContactNo"
                  type="tel"
                />
              </Col>
              <Col span={12}>
                <UniversitySelect<FieldValues>
                  label="Gender"
                  name="student.gender"
                  options={GenderOptions}
                />
              </Col>
              <Col span={12}>
                <UniversitySelect<FieldValues>
                  label="Blood Group"
                  name="student.bloodGroup"
                  options={BloodGroupOptions}
                />
              </Col>

              <Col span={12}>
                <UniversityInput<FieldValues>
                  label="Permanent Address"
                  name="student.permanentAddress"
                />
              </Col>
              <Col span={12}>
                <UniversityInput<FieldValues>
                  label="Present Address"
                  name="student.presentAddress"
                />
              </Col>
              <Col span={24}>
                <label htmlFor="profileImage">Profile Image</label>

                <ProfileImageInput />
              </Col>
            </Row>

            {/* Guardian Info */}
            <Divider orientation="left" style={{ color: "green" }}>
              Guardian Information
            </Divider>
            <Row gutter={16}>
              <Col span={12}>
                <UniversityInput<FieldValues>
                  label="Father's Name"
                  name="student.guardian.fatherName"
                />
              </Col>

              <Col span={12}>
                <UniversityInput<FieldValues>
                  label="Mother's Name"
                  name="student.guardian.motherName"
                />
              </Col>
              <Col span={12}>
                <UniversityInput<FieldValues>
                  label="Father's Contact"
                  name="student.guardian.fatherContactNo"
                  type="tel"
                />
              </Col>
              <Col span={12}>
                <UniversityInput<FieldValues>
                  label="Mother's Contact"
                  name="student.guardian.motherContactNo"
                  type="tel"
                />
              </Col>
              <Col span={12}>
                <UniversityInput<FieldValues>
                  label="Father's Occupation"
                  name="student.guardian.fatherOccupation"
                />
              </Col>
              <Col span={12}>
                <UniversityInput<FieldValues>
                  label="Mother's Occupation"
                  name="student.guardian.motherOccupation"
                />
              </Col>
            </Row>

            {/* Local Guardian Info */}
            <Divider orientation="left" style={{ color: "green" }}>
              Local Guardian
            </Divider>
            <Row gutter={16}>
              <Col span={12}>
                <UniversityInput<FieldValues>
                  label="Guardian Name"
                  name="student.localGuardian.name"
                />
              </Col>
              <Col span={12}>
                <UniversityInput<FieldValues>
                  label="Guardian Contact"
                  name="student.localGuardian.contactNo"
                  type="tel"
                />
              </Col>
              <Col span={12}>
                <UniversityInput<FieldValues>
                  label="Guardian Address"
                  name="student.localGuardian.address"
                />
              </Col>
              <Col span={12}>
                <UniversityInput<FieldValues>
                  label="Guardian Occupation"
                  name="student.localGuardian.occupation"
                />
              </Col>
            </Row>
            {/* Academic Information*/}
            <Divider orientation="left" style={{ color: "green" }}>
              Academic Information
            </Divider>
            <Row gutter={16}>
              <Col span={12}>
                <UniversitySelect<FieldValues>
                  label="Admission Semester"
                  name="student.admissionSemester"
                  options={academicSemesterOptions}
                  disabled={isSemesterFetching}
                />
              </Col>
              <Col span={12}>
                <UniversitySelect<FieldValues>
                  label="Academic Department"
                  name="student.academicDepartment"
                  options={academicDepartmentOptions}
                  disabled={isDepartmentFetching}
                />
              </Col>
            </Row>
            {/* Submit */}
            <Row justify="center" style={{ marginTop: 24 }}>
              <Button htmlType="submit" size="large" type="primary">
                Submit
              </Button>
            </Row>
          </Col>
        </Row>
      </UniversityForm>
    </>
  );
};

export default CreateStudent;
