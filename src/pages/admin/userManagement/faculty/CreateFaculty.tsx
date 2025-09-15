import { Button, Col, Divider, message, Row, Space } from "antd";
import { useEffect } from "react";
import { type FieldValues, type SubmitHandler } from "react-hook-form";
import UniversityDatePicker from "../../../../components/form/UniversityDatePicker";
import UniversityForm from "../../../../components/form/UniversityForm";
import UniversityInput from "../../../../components/form/UniversityInput";
import UniversitySelect from "../../../../components/form/UniversitySelect";
import { useGetAllAcademicDepartmentQuery } from "../../../../redux/features/admin/AcademicManagementApi";
import { useAddFacultyMutation } from "../../../../redux/features/admin/userManagementApi";
import { BloodGroupOptions, GenderOptions } from "../usermanagemantType";
import type { TFaculty } from "./faculty.type";
import ProfileImageInput from "./ProfileImageInput";

// const faultyDefaultValues: TFaculty = {
//   password: "faculty124",
//   // faculty: {
//   designation: "Assistant Professor",
//   name: {
//     firstName: "Majid",
//     middleName: "K.",
//     lastName: "Hossain",
//   },
//   gender: "male",
//   email: "sajid.hossain@university.edu",
//   contactNo: "01822223333",
//   emergencyContactNo: "01955554444",
//   bloodGroup: "AB-",
//   presentAddress: "Shahbagh, Dhaka",
//   permanentAddress: "Sylhet Sadar, Sylhet",
//   academicDepartment: "68a9bd1bf3158a9db25dfc12",
//   message: "",
//   id: "",
//   academicFaculty: {
//     name: "",
//     academicFaculty: {
//       name: "",
//     },
//     isDeleted: false,
//   },
// };

const CreateFaculty = () => {
  const [addFaculty, { data, error, isError, isLoading, isSuccess }] =
    useAddFacultyMutation();
  console.log({ data, error });
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (isSuccess && data) {
      messageApi.success(data?.message || "🎉 Faculty created successfully!");
    }
    if (isError && error) {
      let errorMessage = "❌ Failed to create faculty.";
      if ("data" in error && (error as any).data.errMessages) {
        errorMessage = (error as any).data.errMessages[0]?.message;
      }
      messageApi.error(errorMessage);
    }
  }, [isError, isSuccess, error, data]);
  // query departments
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

  const onSubmit: SubmitHandler<TFaculty> = (data) => {
    console.log(data);
    const formData = new FormData();
    const facultyData = {
      password: "faculty123",
      faculty: data.faculty,
    };
    formData.append("data", JSON.stringify(facultyData));

    if (data.faculty.profileImage) {
      formData.append("file", data.faculty.profileImage);
    }
    addFaculty(formData);
    console.log([...formData.entries()]);
  };
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      {contextHolder}
      {departmentError && (
        <div style={{ color: "red" }}> Failed to load departments.</div>
      )}
      <Row justify="center">
        <Col xs={24}>
          <div className="text-2xl font-bold text-center">
            Faculty Intro Form
          </div>
        </Col>
      </Row>

      <UniversityForm onSubmit={onSubmit}>
        <Row justify="center" align="middle">
          <Col span={24} md={20} lg={16}>
            {/* Personal Info */}
            <Divider orientation="left" style={{ color: "green" }}>
              Personal Information
            </Divider>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <UniversityInput<FieldValues>
                  label="First Name"
                  name="faculty.name.firstName"
                />
              </Col>
              <Col xs={24} sm={12}>
                <UniversityInput<FieldValues>
                  label="Last Name"
                  name="faculty.name.lastName"
                />
              </Col>
              <Col xs={24} sm={12}>
                <UniversityInput<FieldValues>
                  label="Designation"
                  name="faculty.designation"
                />
              </Col>
              <Col xs={24} sm={12}>
                <UniversityInput<FieldValues>
                  label="Email"
                  name="faculty.email"
                  type="email"
                />
              </Col>
              <Col xs={24} sm={12}>
                <UniversityInput<FieldValues>
                  label="Contact Number"
                  name="faculty.contactNo"
                  type="tel"
                />
              </Col>

              <Col xs={24} sm={12}>
                <UniversityDatePicker<FieldValues>
                  label="Date of Birth"
                  name="faculty.dateOfBirth"
                />
              </Col>
              <Col xs={24} sm={12}>
                <UniversityInput<FieldValues>
                  label="Emergency Contact Number"
                  name="faculty.emergencyContactNo"
                  type="tel"
                />
              </Col>
              <Col xs={24} sm={12}>
                <UniversitySelect<FieldValues>
                  label="Gender"
                  name="faculty.gender"
                  options={GenderOptions}
                />
              </Col>
              <Col xs={24} sm={12}>
                <UniversitySelect<FieldValues>
                  label="Blood Group"
                  name="faculty.bloodGroup"
                  options={BloodGroupOptions}
                />
              </Col>
              <Col xs={24} sm={12}>
                <UniversityInput<FieldValues>
                  label="Permanent Address"
                  name="faculty.permanentAddress"
                />
              </Col>
              <Col xs={24} sm={12}>
                <UniversityInput<FieldValues>
                  label="Present Address"
                  name="faculty.presentAddress"
                />
              </Col>
              <Col xs={24} sm={12}>
                <label htmlFor="profileImage">Profile Image</label>
                <ProfileImageInput />
              </Col>
            </Row>
            {/* Academic Information*/}
            <Divider orientation="left" style={{ color: "green" }}>
              Academic Information
            </Divider>
            <Row gutter={16}>
              <Col span={24}>
                <UniversitySelect<FieldValues>
                  label="Academic Department"
                  name="faculty.academicDepartment"
                  options={academicDepartmentOptions}
                  disabled={isDepartmentFetching}
                />
              </Col>
            </Row>
            {/* Submit */}
            <Row
              justify={{ xs: "center", md: "end" }}
              style={{ marginTop: 24 }}
            >
              <Button
                htmlType="submit"
                size="large"
                type="primary"
                loading={isLoading}
              >
                Submit
              </Button>
            </Row>
          </Col>
        </Row>
      </UniversityForm>
    </Space>
  );
};

export default CreateFaculty;
