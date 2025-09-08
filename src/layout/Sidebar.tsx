import { Layout, Menu } from "antd";
import type { ItemType } from "antd/es/menu/interface";
import { adminPaths } from "../routes/adminRoutes";
import { facultyPaths } from "../routes/facultyRoutes ";
import { studentPaths } from "../routes/studentPaths";
import type { TUserRole } from "../types";
import sidebarItemsGenerator from "../utils/sidebarItemsGenerator";

type SidebarProps = {
  role: TUserRole;
};

const { Sider } = Layout;
const Sidebar = ({ role }: SidebarProps) => {
  let sidebarItems: ItemType[] | undefined;

  switch (role) {
    case "admin":
      sidebarItems = sidebarItemsGenerator(adminPaths, "admin");

      break;
    case "faculty":
      sidebarItems = sidebarItemsGenerator(facultyPaths, "faculty");

      break;
    case "student":
      sidebarItems = sidebarItemsGenerator(studentPaths, "student");

      break;

    default:
      sidebarItems = [];
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{ height: "100vh", position: "sticky", left: "0", top: "0" }}
    >
      <div
        style={{
          color: "blue",
          justifyContent: "center",
          display: "flex",
          fontSize: "16px",
          alignItems: "center",
          fontWeight: "bold",
          height: "4rem",
        }}
      >
        UNIVERSITY APP
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
