import { Button, Col, Row, Space } from "antd";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import UniversityForm from "../components/form/UniversityForm";
import UniversityInput from "../components/form/UniversityInput";
import { useChangePasswordMutation } from "../redux/features/admin/userManagementApi";
import { logOut } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import type { APIError } from "./admin/academicManagement/academicManagement.type";

const ChangePassword = () => {
  const [passwordChange] = useChangePasswordMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // Form submit
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await passwordChange(data);
      if (res.error) {
        const errData = (res.error as APIError)?.data as APIError;
        toast.error(errData.errorMessages[0].message || "Something went wrong");
      } else {
        toast.success("Password Change Successfully");
        if (res.data.success) {
          dispatch(logOut());
          navigate("/login");
        }
      }
      console.log("Final Semester Data:", res);
    } catch (error) {
      toast.error("Error occured in changing password");
    }
  };
  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "100%", marginTop: "48px" }}
    >
      <Row justify="center" align="middle">
        <Col xs={20}>
          <div className="text-2xl font-bold text-center">
            Academic Semester Form
          </div>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col xs={20} sm={16} md={12} lg={6}>
          <UniversityForm<FieldValues> onSubmit={onSubmit}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <UniversityInput<FieldValues>
                label="Old Password"
                name="oldPassword"
                rules={{ required: "Old password is required" }}
              />
              <UniversityInput<FieldValues>
                label="New Password"
                name="newPassword"
                rules={{ required: "New password is required" }}
              />
              <Row justify="start">
                <Button htmlType="submit" size="large" type="primary">
                  Submit
                </Button>
              </Row>
            </Space>
          </UniversityForm>
        </Col>
      </Row>
    </Space>
  );
};

export default ChangePassword;
