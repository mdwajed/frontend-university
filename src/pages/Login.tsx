import { Button, Row } from "antd";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import UniversityForm from "../components/form/UNiversityForm";
import UniversityInput from "../components/form/UNiversityInput";
import { useLoginMutation } from "../redux/api/authApi";
import { setUser, type TUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import verifyToken from "../utils/verifyToken";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      console.log("Toast fired!");
      toast.success("Login successfull", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <UniversityForm
        onSubmit={onSubmit}
        defaultValues={{
          id: "A-0001",
          password: "admin123",
        }}
      >
        <UniversityInput type="text" name="id" label="User ID" />
        <UniversityInput type="text" name="password" label="Password" />
        <Button htmlType="submit">Submit</Button>
      </UniversityForm>
    </Row>
  );
};
export default Login;
