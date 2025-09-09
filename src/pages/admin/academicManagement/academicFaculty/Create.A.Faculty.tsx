import { Button, Col, Row } from "antd";
import { type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import UniversityForm from "../../../../components/form/UniversityForm";
import UniversitySelect from "../../../../components/form/UniversitySelect";
import { useAddAcademicFacultyMutation } from "../../../../redux/features/admin/AcademicManagementApi";
import type { APIError } from "../academicManagement.type";
import { academicFacultyName } from "./academicFaculty.type";

const CreateSemester = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const facultyName = academicFacultyName.find(
      (opt) => opt.value === data.name
    )?.label;
    const facultyData = {
      name: facultyName ?? "",
    };

    try {
      await addAcademicFaculty(facultyData);
      toast.success("Academic Faculty Data Created Successfully");
    } catch (error) {
      const errData = (error as APIError)?.data as APIError;
      toast.error(
        errData.message || "Error occured in generating academic faculty data"
      );
    }
  };
  const defaultValues = {
    name: "01",
  };

  return (
    <Row justify="center" align="middle">
      <Col span={8}>
        <UniversityForm<FieldValues>
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        >
          <UniversitySelect<FieldValues>
            label="Academic Faculty Name"
            name="name"
            options={academicFacultyName}
            rules={{ required: "Faculty name is required" }}
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
