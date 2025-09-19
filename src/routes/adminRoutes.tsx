import AcademicDepartment from "../pages/admin/academicManagement/academicDepartment/AcademicDepartment";
import CreateDepartment from "../pages/admin/academicManagement/academicDepartment/Create.A.Department";
import AcademicFaculty from "../pages/admin/academicManagement/academicFaculty/AcademicFaculty";
import CreateAcademicFaculty from "../pages/admin/academicManagement/academicFaculty/Create.A.Faculty";
import AcademicSemester from "../pages/admin/academicManagement/academicSemester/AcademicSemester";
import CreateSemester from "../pages/admin/academicManagement/academicSemester/Create.A.semester";
import CourseIntro from "../pages/admin/courseManagement/course/CourseIntro";
import Courses from "../pages/admin/courseManagement/course/Courses";
import CreateCourse from "../pages/admin/courseManagement/course/CreateCourse";
import CreateOfferedCourse from "../pages/admin/courseManagement/offeredCourse/CreateOfferedCourse";
import OfferedCourses from "../pages/admin/courseManagement/offeredCourse/OfferedCourses";
import CreateSemesterRegistration from "../pages/admin/courseManagement/semesterRegistration/CreateSemesterRegistration";
import RegisteredSemester from "../pages/admin/courseManagement/semesterRegistration/RegisteredSemester";
import AdminDashboard from "../pages/admin/userManagement/AdminDashboard";
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/faculty/CreateFaculty";
import FacultyIntro from "../pages/admin/userManagement/faculty/FacultyIntro";
import CreateStudent from "../pages/admin/userManagement/student/CreateStudent";
import StudentIntro from "../pages/admin/userManagement/student/StudentIntro";

export const adminPaths = [
  {
    name: "Dashboard",
    index: true,
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
        path: "create-academic-faculty",
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
      {
        name: "Student Intro",
        path: "student-intro",
        element: <StudentIntro />,
      },
      {
        name: "Faculty Intro",
        path: "faculty-intro",
        element: <FacultyIntro />,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "Courses",
        path: "courses",
        element: <Courses />,
      },
      {
        name: "Create Semester Registration",
        path: "create-semester-registration",
        element: <CreateSemesterRegistration />,
      },
      {
        name: " Registered Semesters",
        path: "registered-semesters",
        element: <RegisteredSemester />,
      },
      {
        name: "Create Offered Course",
        path: "create-offered-course",
        element: <CreateOfferedCourse />,
      },
      {
        name: " Offered Courses",
        path: "offered-courses",
        element: <OfferedCourses />,
      },
      {
        name: "Course Intro",
        path: "course-intro",
        element: <CourseIntro />,
      },
      {
        name: "Offered Course",
        path: "offered-course",
        element: <CreateOfferedCourse />,
      },
    ],
  },
];
