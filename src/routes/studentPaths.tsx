import EnrolledCourses from "../pages/student/EnrolledCourses";
import StudentDashboard from "../pages/student/StudentDashboard";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Enrolled Courses",
    path: "enrolled-course",
    element: <EnrolledCourses />,
  },
];
