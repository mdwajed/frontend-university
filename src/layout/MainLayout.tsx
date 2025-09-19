import { Button, Layout } from "antd";
import { Outlet } from "react-router";
import {
  logOut,
  useCurrentToken,
  type TUser,
} from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import type { TUserRole } from "../types";
import verifyToken from "../utils/verifyToken";
import Sidebar from "./Sidebar";

const { Header, Content } = Layout;

const MainLayout = () => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  const user: TUser | undefined = token
    ? (verifyToken(token) as TUser)
    : undefined;

  const handleClick = () => {
    dispatch(logOut());
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar role={user?.role as TUserRole} />
      <Layout>
        <Header style={{ padding: 0 }}>
          <Button onClick={handleClick}>LogOut</Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
