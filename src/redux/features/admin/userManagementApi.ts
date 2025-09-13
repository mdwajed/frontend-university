import type { FilterArg } from "../../../pages/admin/academicManagement/academicManagement.type";
import type {
  TFaculty,
  TFacultyApiResponse,
} from "../../../pages/admin/userManagement/faculty/faculty.type";
import type {
  TStudent,
  TStudentApiResponse,
} from "../../../pages/admin/userManagement/student/student.type";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudent: builder.query<TStudentApiResponse, FilterArg>({
      query: (filters) => {
        const params: Record<string, string> = {};

        filters?.forEach((filter) => {
          params[filter.name] = filter.value;
        });
        return {
          url: "/students",
          method: "GET",
          params,
        };
      },
    }),

    addStudent: builder.mutation<TStudent, FormData>({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),

    getAllFaculty: builder.query<TFacultyApiResponse, FilterArg>({
      query: (filters) => {
        const params: Record<string, string> = {};

        filters?.forEach((filter) => {
          params[filter.name] = filter.value;
        });
        return {
          url: "/faculties",
          method: "GET",
          params,
        };
      },
    }),

    addFaculty: builder.mutation<TFaculty, FormData>({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetAllStudentQuery,
  useAddFacultyMutation,
  useGetAllFacultyQuery,
} = userManagementApi;
