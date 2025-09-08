import { Button, Col, Row } from "antd";
import { type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import UniversityForm from "../../../../components/form/UniversityForm";
import UniversitySelect from "../../../../components/form/UniversitySelect";
import { useAddAcademicSemesterMutation } from "../../../../redux/features/admin/AcademicManagementApi";
import {
  monthOptions,
  nameOptions,
  type APIError,
} from "./academicSemester.constant";
import EndMonthSelect from "./EndMonthSelect";

// Generate years dynamically
const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 4 }, (_, i) => {
  const year = currentYear + i;
  return { value: String(year), label: String(year) };
});

const CreateSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const semesterName = nameOptions.find(
      (opt) => opt.value === data.name
    )?.label;
    const startMonth = monthOptions.find(
      (opt) => opt.value === data.startMonth
    )?.label;
    const endMonth = monthOptions.find(
      (opt) => opt.value === data.endMonth
    )?.label;
    const semesterData = {
      name: semesterName ?? "",
      code: data.name,
      academicYear: data.academicYear,
      startMonth,
      endMonth,
    };

    try {
      const res = await addAcademicSemester(semesterData);
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

  const defaultValues = {
    name: "01",
    academicYear: String(currentYear),
    startMonth: "01",
    endMonth: "04",
  };

  return (
    <Row justify="center" align="middle">
      <Col span={12}>
        <UniversityForm<FieldValues>
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        >
          <Row gutter={16}>
            <Col span={12}>
              <UniversitySelect<FieldValues>
                label="Semester Name"
                name="name"
                options={nameOptions}
                rules={{ required: "Semester name is required" }}
              />
            </Col>
            <Col span={12}>
              <UniversitySelect<FieldValues>
                label="Academic Year"
                name="academicYear"
                options={yearOptions}
                rules={{ required: "Academic year is required" }}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <UniversitySelect<FieldValues>
                label="Start Month"
                name="startMonth"
                options={monthOptions}
                rules={{ required: "Start month is required" }}
              />
            </Col>
            <Col span={12}>
              <EndMonthSelect />
            </Col>
          </Row>

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
