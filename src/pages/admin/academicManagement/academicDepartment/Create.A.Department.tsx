import { Button, Col, Row, Spin } from "antd";
import { type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import UniversityForm from "../../../../components/form/UniversityForm";
import UniversityInput from "../../../../components/form/UniversityInput";
import UniversitySelect from "../../../../components/form/UniversitySelect";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultyQuery,
} from "../../../../redux/features/admin/AcademicManagementApi";
import type { APIError } from "../academicManagement.type";

const CreateDepartment = () => {
  const [addAcademicDepartment, { isLoading: isSubmitting }] =
    useAddAcademicDepartmentMutation();
  const { data: facultyData, isFetching } =
    useGetAllAcademicFacultyQuery(undefined);
  const facultyOptions =
    facultyData?.data?.map((faculty: any) => ({
      label: faculty.name,
      value: faculty._id,
    })) || [];

  // Wait until faculties are loaded to set default values
  if (isFetching) return <Spin tip="Loading faculties..." />;

  if (!facultyOptions.length)
    return <p>No faculties found. Please create a faculty first.</p>;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const departmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };

    try {
      await addAcademicDepartment(departmentData).unwrap();
      toast.success("Academic Faculty Data Created Successfully");
    } catch (error) {
      console.log(error);
      const errData =
        ((error as APIError)?.data as APIError) ||
        "Error occured in generating academic faculty data";
      toast.error(errData.message);
    }
  };

  const defaultValues = {
    name: "Department of Architecture (Arch)",
    academicFaculty: facultyOptions[0]?.value || "",
  };

  return (
    <Row justify="center" align="middle">
      <Col span={8}>
        <UniversityForm<FieldValues>
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        >
          <UniversityInput<FieldValues>
            label="Academic Department Name"
            name="name"
            type="text"
          />
          <UniversitySelect<FieldValues>
            label="Academic Faculty Name"
            name="academicFaculty"
            options={facultyOptions}
            rules={{ required: "academicFaculty ID is required" }}
            disabled={isSubmitting}
          />
          <Row justify="end" style={{ marginTop: 16 }}>
            <Button
              htmlType="submit"
              size="large"
              type="primary"
              loading={isSubmitting}
            >
              Submit
            </Button>
          </Row>
        </UniversityForm>
      </Col>
    </Row>
  );
};

export default CreateDepartment;
