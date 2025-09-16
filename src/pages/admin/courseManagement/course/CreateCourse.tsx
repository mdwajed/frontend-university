import { Button, Col, Row, Space } from "antd";
import { type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import UniversityForm from "../../../../components/form/UniversityForm";
import UniversityInput from "../../../../components/form/UniversityInput";
import UniversitySelect from "../../../../components/form/UniversitySelect";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../../redux/features/admin/AcademicManagementApi";
import type { APIError } from "../../academicManagement/academicManagement.type";
import type { ICourse } from "./course.type";

const CreateCourse = () => {
  const [addCourse] = useAddCourseMutation();
  const { data: courses } = useGetAllCoursesQuery();
  console.log("courses api response:", courses);

  const preRequisiteCoursesOptions =
    courses?.data?.map((item: ICourse) => ({
      value: item._id,
      label: item.title,
    })) || [];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: (data.preRequisiteCourses as string[]).map((id) => ({
        course: id,
        isDeleted: false,
      })),
    };

    try {
      const res = await addCourse(courseData);
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
          <div className="text-2xl font-bold text-center">Add Course Form</div>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={24} sm={20} md={16}>
          <UniversityForm<FieldValues> onSubmit={onSubmit}>
            <Row gutter={16}>
              <Col xs={24} sm={20} md={12}>
                <UniversityInput<FieldValues>
                  label="Course Name"
                  name="title"
                  rules={{ required: "Course name is required" }}
                />
              </Col>
              <Col xs={24} sm={20} md={12}>
                <UniversityInput<FieldValues>
                  label="Course Prefix"
                  name="prefix"
                  rules={{ required: "Course prefix is required" }}
                />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={20} md={12}>
                <UniversityInput<FieldValues> label="Course Code" name="code" />
              </Col>
              <Col xs={24} sm={20} md={12}>
                <UniversityInput<FieldValues>
                  label="Course Credits"
                  name="credits"
                  rules={{ required: "Course credits is required" }}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <UniversitySelect<FieldValues>
                  label="Prerequisite Courses"
                  name="preRequisiteCourses"
                  options={preRequisiteCoursesOptions}
                  rules={{ required: "Prerequisite courses is required" }}
                  multiple
                />
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

export default CreateCourse;
