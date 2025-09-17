import type {
  TAcademicDepaetment,
  TAcademicDepartmentResponse,
} from "../../../pages/admin/academicManagement/academicDepartment/AcademicDepartment.type";
import type { TAcademicFaculty } from "../../../pages/admin/academicManagement/academicFaculty/academicFaculty.type";
import type { FilterArg } from "../../../pages/admin/academicManagement/academicManagement.type";
import type {
  TAcademicSemester,
  TAcademicSemesterResponse,
} from "../../../pages/admin/academicManagement/academicSemester/academicSemester.constant";
import type {
  ICourse,
  IPagination,
} from "../../../pages/admin/courseManagement/course/course.type";
import type {
  TRegisteredSemester,
  TRegisteredSemesterResponse,
} from "../../../pages/admin/courseManagement/semesterRegistration/semesterRegistration.type";
import { baseApi } from "../../api/baseApi";

const AcademicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemester: builder.query<
      TAcademicSemesterResponse,
      FilterArg | void
    >({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((filter) => {
            params.append(filter.name, filter.value);
          });
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
    }),

    addAcademicSemester: builder.mutation<
      TAcademicSemester,
      Partial<TAcademicSemester>
    >({
      query: (data) => ({
        url: "/academic-semesters/create-semester",
        method: "POST",
        body: data,
      }),
    }),
    addAcademicFaculty: builder.mutation<
      TAcademicFaculty,
      Partial<TAcademicFaculty>
    >({
      query: (data) => ({
        url: "/academic-faculties/create-faculty",
        method: "POST",
        body: data,
      }),
    }),
    getAllAcademicFaculty: builder.query({
      query: (body) => ({
        url: "/academic-faculties",
        method: "GET",
        body,
      }),
    }),
    addAcademicDepartment: builder.mutation<
      TAcademicDepaetment,
      Partial<TAcademicDepaetment>
    >({
      query: (data) => ({
        url: "/academic-departments/create-department",
        method: "POST",
        body: data,
      }),
    }),
    getAllAcademicDepartment: builder.query<
      TAcademicDepartmentResponse,
      FilterArg | void
    >({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((filter) => {
            params.append(filter.name, filter.value);
          });
        }
        return {
          url: "/academic-departments",
          method: "GET",
          params: params,
        };
      },
    }),
    getAllRegisteredSemester: builder.query<
      TRegisteredSemesterResponse,
      FilterArg | void
    >({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((filter) => {
            params.append(filter.name, filter.value);
          });
        }
        return {
          url: "/semester-registration",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["RegisteredSemester"],
    }),

    addRegisteredSemester: builder.mutation<
      TRegisteredSemester,
      Partial<TRegisteredSemester>
    >({
      query: (data) => ({
        url: "/semester-registration/create-semester-registration",
        method: "POST",
        body: data,
      }),
    }),
    updateRegisteredSemesterStatus: builder.mutation<
      TRegisteredSemester,
      Partial<TRegisteredSemester>
    >({
      query: ({ _id, status }) => ({
        url: `/semester-registration/${_id}`,
        method: "PATCH",
        body: { status },
      }),

      transformResponse: (response: { data: TRegisteredSemester }) => {
        return response.data;
      },
      invalidatesTags: ["RegisteredSemester"],
    }),

    addCourse: builder.mutation<ICourse, Partial<ICourse>>({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),
    getAllCourses: builder.query<IPagination<ICourse>, FilterArg | void>({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((filter) => {
            params.append(filter.name, filter.value);
          });
        }
        return {
          url: "/courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["course"],
    }),
    assignFacultyToCourse: builder.mutation<
      ICourse,
      { courseId: string; faculties: string[] }
    >({
      query: ({ courseId, faculties }) => ({
        url: `/courses/${courseId}/assign-faculties`,
        method: "PUT",
        body: { faculties },
      }),
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useGetAllAcademicSemesterQuery,
  useAddAcademicSemesterMutation,
  useAddAcademicFacultyMutation,
  useGetAllAcademicFacultyQuery,
  useGetAllAcademicDepartmentQuery,
  useAddAcademicDepartmentMutation,
  useAddRegisteredSemesterMutation,
  useGetAllRegisteredSemesterQuery,
  useUpdateRegisteredSemesterStatusMutation,
  useAddCourseMutation,
  useGetAllCoursesQuery,
  useAssignFacultyToCourseMutation,
} = AcademicManagementApi;
