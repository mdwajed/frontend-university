import AcademicDepartment from "../pages/admin/academicManagement/academicDepartment/AcademicDepartment";
import CreateDepartment from "../pages/admin/academicManagement/academicDepartment/Create.A.Department";
import AcademicFaculty from "../pages/admin/academicManagement/academicFaculty/AcademicFaculty";
import CreateAcademicFaculty from "../pages/admin/academicManagement/academicFaculty/Create.A.Faculty";
import AcademicSemester from "../pages/admin/academicManagement/academicSemester/AcademicSemester";
import CreateSemester from "../pages/admin/academicManagement/academicSemester/Create.A.semester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Academic Semester",
        path: "academic-semesters",
        element: <AcademicSemester />,
      },
      {
        name: "Create A. Semester",
        path: "create-semester",
        element: <CreateSemester />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculties",
        element: <AcademicFaculty />,
      },
      {
        name: "Create A. Faculty",
        path: "create-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Department",
        path: "academic-departments",
        element: <AcademicDepartment />,
      },
      {
        name: "Create A .Department",
        path: "create-department",
        element: <CreateDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
];

// export const adminSidebarItem = adminPaths.reduce(
//   (acc: ItemType<MenuItemType>[], item) => {
//     if (item.path && item.name) {
//       acc.push({
//         key: item.name,
//         label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
//       });
//     }
//     if (item.children) {
//       acc.push({
//         key: item.name,
//         label: item.name,
//         children: item.children.map((child) => ({
//           key: child.name,
//           label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
//         })),
//       });
//     }
//     return acc;
//   },
//   []
// );
// export const adminRoutes = adminPaths.reduce((acc: TRoutes[], item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }
//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element,
//       });
//     });
//   }
//   return acc;
// }, []);
