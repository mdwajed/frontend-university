import type { TAcademicFaculty } from "../../../pages/admin/academicManagement/academicFaculty/academicFaculty.type";
import type {
  FilterArg,
  TAcademicSemester,
  TAcademicSemesterResponse,
} from "../../../pages/admin/academicManagement/academicSemester/academicSemester.constant";
import { baseApi } from "../../api/baseApi";

const AcademicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemester: builder.query<TAcademicSemesterResponse, FilterArg>(
      {
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
      }
    ),

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
      query: () => ({
        // const params = new URLSearchParams();
        // if (args) {
        //   args.forEach((filter) => {
        //     params.append(filter.name, filter.value);
        //   });
        // }
        // return {
        url: "/academic-faculties",
        method: "GET",
        // params: params,
      }),
    }),
  }),
});

export const {
  useGetAllAcademicSemesterQuery,
  useAddAcademicSemesterMutation,
  useAddAcademicFacultyMutation,
  useGetAllAcademicFacultyQuery,
} = AcademicManagementApi;
