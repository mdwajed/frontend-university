import type { FilterArg } from "../../../pages/admin/academicManagement/academicManagement.type";
import type {
  TStudent,
  TStudentApiResponse,
} from "../../../pages/admin/userManagement/student/student.type";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudent: builder.query<TStudentApiResponse, FilterArg>({
      //   query: (filters) => {
      //     const params: Record<string, string> = {};
      //     if (filters) {
      //       filters.forEach((filter) => {
      //         params[filter.name] = filter.value;
      //       });
      //     }
      //     return {
      //       url: "/students",
      //       method: "GET",
      //       params,
      //     };
      //   },
      // }),
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
  }),
});

export const { useAddStudentMutation, useGetAllStudentQuery } =
  userManagementApi;
