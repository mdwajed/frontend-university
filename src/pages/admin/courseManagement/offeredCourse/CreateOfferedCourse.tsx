import { Button, Col, Row, Space } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import UniversityForm from "../../../../components/form/UniversityForm";
import UniversityInput from "../../../../components/form/UniversityInput";
import UniversitySelect from "../../../../components/form/UniversitySelect";
import UniversitySelectWatch from "../../../../components/form/UniversitySelectWatch";
import UniversityTimePicker from "../../../../components/form/UniversityTimePicker";
import {
  useAddOfferedCourseMutation,
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultyQuery,
  useGetAllAssignedFacultiesToCourseQuery,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemesterQuery,
} from "../../../../redux/features/admin/AcademicManagementApi";
import type { APIError } from "../../academicManagement/academicManagement.type";
import { daysOptions } from "./offeredCourse.type";

const CreateOfferedCourse = () => {
  const [courseId, setCourseId] = useState("");
  const [addOfferedCourse] = useAddOfferedCourseMutation();

  // Fetch data
  const { data: courseData } = useGetAllCoursesQuery();
  const { data: academicFacultyData } = useGetAllAcademicFacultyQuery();
  const { data: facultiesData, isFetching: facultiesFetching } =
    useGetAllAssignedFacultiesToCourseQuery(courseId, { skip: !courseId });
  console.log({ courseId });
  const { data: semesterData } = useGetAllRegisteredSemesterQuery();
  const { data: departmentData } = useGetAllAcademicDepartmentQuery();

  // Options for selects
  const facultiesOptions =
    facultiesData?.map((faculty) => ({
      value: faculty._id,
      label: [
        faculty.name.firstName,
        faculty.name.middleName,
        faculty.name.lastName,
      ]
        .filter(Boolean)
        .join(" "),
    })) || [];
  console.log({ facultiesData });

  const semesterOptions = semesterData?.data.map((semester) => ({
    value: semester._id,
    label: `${semester.academicSemester.name} ${semester.academicSemester.academicYear}`,
  }));

  const courseOptions = courseData?.data.map((course) => ({
    value: course._id,
    label: course.title,
  }));

  const departmentOptions = departmentData?.data.map((department) => ({
    value: department._id,
    label: department.name,
  }));

  const academicFacultyOptions = academicFacultyData?.data.map(
    (academicFaculty) => ({
      value: academicFaculty._id,
      label: academicFaculty.name,
    })
  );

  // Form submit
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const facultiesData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: dayjs(data.startTime).format("HH:mm"),
      endTime: dayjs(data.endTime).format("HH:mm"),
    };

    try {
      const res = await addOfferedCourse(facultiesData);
      if (res.error) {
        const errData = (res.error as APIError)?.data as APIError;
        toast.error(errData.message || "Something went wrong");
      } else {
        toast.success("Academic Semester Data created Successfully");
      }
      console.log("Final Semester Data:", res);
    } catch (error) {
      toast.error("Error occured in generating semester data");
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Row justify="center">
        <Col xs={24}>
          <div className="text-2xl font-bold text-center">
            Add Offered Course Form
          </div>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={24} sm={20} md={16}>
          <UniversityForm<FieldValues> onSubmit={onSubmit}>
            <Row gutter={16}>
              <Col xs={24} sm={20} md={12}>
                <UniversitySelect<FieldValues>
                  label="Registered Semester"
                  name="semesterRegistration"
                  options={semesterOptions}
                  rules={{ required: "Registered Semester is required" }}
                />
              </Col>
              <Col xs={24} sm={20} md={12}>
                <UniversitySelect<FieldValues>
                  label="Academic Department"
                  name="academicDepartment"
                  options={departmentOptions}
                  rules={{ required: "Academic Departmen is required" }}
                />
              </Col>
              <Col xs={24} sm={20} md={12}>
                <UniversitySelect<FieldValues>
                  label="Academic Faculty"
                  name="academicFaculty"
                  options={academicFacultyOptions}
                  rules={{ required: "Academic Faculty is required" }}
                />
              </Col>
              <Col xs={24} sm={20} md={12}>
                <UniversitySelectWatch<FieldValues>
                  label="Course"
                  name="course"
                  options={courseOptions}
                  onValueChange={setCourseId}
                  rules={{ required: "Course prefix is required" }}
                />
              </Col>
              <Col xs={24} sm={20} md={12}>
                <UniversitySelect<FieldValues>
                  label="Course Faculty"
                  name="faculty"
                  options={facultiesOptions}
                  disabled={!courseId || facultiesFetching}
                  rules={{ required: "Faculty is required" }}
                />
              </Col>
              <Col xs={24} sm={20} md={12}>
                <UniversityInput<FieldValues>
                  label="Maximum Capacity"
                  name="maxCapacity"
                  rules={{ required: "Maximum Capacity is required" }}
                />
              </Col>
              <Col xs={24} sm={20} md={12}>
                <UniversityInput<FieldValues>
                  label="Section"
                  name="section"
                  rules={{ required: "Section is required" }}
                />
              </Col>
              <Col xs={24} sm={20} md={12}>
                <UniversitySelect<FieldValues>
                  multiple
                  options={daysOptions}
                  label="Days"
                  name="days"
                  rules={{ required: "Days is required" }}
                />
              </Col>
              <Col xs={24} sm={20} md={12}>
                <UniversityTimePicker label="Start Time" name="startTime" />
              </Col>
              <Col xs={24} sm={20} md={12}>
                <UniversityTimePicker label="End Time" name="endTime" />
              </Col>
            </Row>
            <Row
              justify={{ xs: "center", md: "end" }}
              style={{ marginTop: 16 }}
            >
              <Button htmlType="submit" size="large" type="primary">
                Submit
              </Button>
            </Row>
          </UniversityForm>
        </Col>
      </Row>
    </Space>
  );
};

export default CreateOfferedCourse;
