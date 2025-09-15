import { Button, Col, Row, Space } from "antd";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import UniversityDatePicker from "../../../../components/form/UniversityDatePicker";
import UniversityForm from "../../../../components/form/UniversityForm";
import UniversityInput from "../../../../components/form/UniversityInput";
import UniversitySelect from "../../../../components/form/UniversitySelect";
import {
  useAddRegisteredSemesterMutation,
  useGetAllAcademicSemesterQuery,
} from "../../../../redux/features/admin/AcademicManagementApi";
import type { APIError } from "../../academicManagement/academicManagement.type";
import { semesterStatusOptions } from "./semesterRegistration.type";

const CreateSemesterRegistration = () => {
  const [addRegisteredSemester] = useAddRegisteredSemesterMutation();

  const { data: semesterData, isFetching } = useGetAllAcademicSemesterQuery();

  const academicSemesterOptions =
    semesterData?.data?.map((semester: any) => ({
      label: `${semester.name} ${semester.academicYear}`,
      value: semester._id,
    })) || [];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    const semesterData = {
      ...data,
      maxCredit: Number(data.maxCredit),
      minCredit: Number(data.minCredit),
    };
    console.log(semesterData);
    try {
      const res = await addRegisteredSemester(semesterData);
      if (res.error) {
        const errData = (res.error as APIError)?.data as APIError;
        toast.error(errData.errorMessages[0].message || "Something went wrong");
      } else {
        toast.success("Academic Semester Data Created Successfully");
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
            Semester Registration Form
          </div>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={24} sm={20} md={16}>
          <UniversityForm<FieldValues>
            onSubmit={onSubmit}
            //   defaultValues={defaultValues}
          >
            <Row gutter={16}>
              <Col xs={24} sm={20} md={12}>
                <UniversitySelect<FieldValues>
                  label="Academic Semester"
                  name="academicSemester"
                  options={academicSemesterOptions}
                  rules={{ required: "Academic Semeste is required" }}
                />
              </Col>
              <Col xs={24} sm={20} md={12}>
                <UniversitySelect<FieldValues>
                  label="Status"
                  name="status"
                  options={semesterStatusOptions}
                  rules={{ required: "Semester status is required" }}
                />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={20} md={12}>
                <UniversityDatePicker<FieldValues>
                  label="Start Date"
                  name="startDate"
                />
              </Col>
              <Col xs={24} sm={20} md={12}>
                <UniversityDatePicker<FieldValues>
                  label="End Date"
                  name="endDate"
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={20} md={12}>
                <UniversityInput<FieldValues>
                  label="Min Credit"
                  name="minCredit"
                />
              </Col>
              <Col xs={24} sm={20} md={12}>
                <UniversityInput<FieldValues>
                  label="Max Credit"
                  name="maxCredit"
                />
              </Col>
            </Row>

            <Row
              justify={{ xs: "center", md: "end" }}
              style={{ marginTop: 16 }}
            >
              <Button
                htmlType="submit"
                size="large"
                type="primary"
                loading={isFetching}
              >
                Submit
              </Button>
            </Row>
          </UniversityForm>
        </Col>
      </Row>
    </Space>
  );
};

export default CreateSemesterRegistration;
