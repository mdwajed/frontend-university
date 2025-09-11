import { Button, Col, Row } from "antd";
import { type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import UniversityForm from "../../../../components/form/UniversityForm";
import UniversityInput from "../../../../components/form/UniversityInput";
import { useAddAcademicFacultyMutation } from "../../../../redux/features/admin/AcademicManagementApi";
import type { APIError } from "../academicManagement.type";

const CreateSemester = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const facultyData = {
      name: data.name,
    };

    try {
      await addAcademicFaculty(facultyData).unwrap();
      toast.success("Academic Faculty Data Created Successfully");
    } catch (error) {
      const errData = (error as APIError)?.data as APIError;
      toast.error(
        errData.message || "Error occured in generating academic faculty data"
      );
    }
  };
  const defaultValues = {
    name: "Faculty of Engineering",
  };

  return (
    <Row justify="center" align="middle">
      <Col span={8}>
        <UniversityForm<FieldValues>
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        >
          <UniversityInput<FieldValues>
            label="Academic Faculty Name"
            name="name"
          />
          <Row justify="end" style={{ marginTop: 16 }}>
            <Button htmlType="submit" size="large" type="primary">
              Submit
            </Button>
          </Row>
        </UniversityForm>
      </Col>
    </Row>
  );
};

export default CreateSemester;
