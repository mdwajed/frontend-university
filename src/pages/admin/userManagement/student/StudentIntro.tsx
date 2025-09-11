import { Table, type TableColumnsType, type TableProps } from "antd";
import { useState } from "react";
import { useGetAllStudentQuery } from "../../../../redux/features/admin/userManagementApi";
import type { TQueryParam } from "../../academicManagement/academicManagement.type";
import type { TStudentRow } from "./student.type";

const StudentIntro = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const { data: studentData, isFetching } = useGetAllStudentQuery(params);

  const tableData: TStudentRow[] =
    studentData?.data?.map(
      ({
        _id,
        name,
        profileImage,
        academicDepartment,
        admissionSemester,
        academicFaculty,
      }) => ({
        _id,
        name: `${name?.firstName} ${name?.middleName || ""} ${
          name?.lastName || ""
        }`.trim(),
        profileImage: profileImage || "",
        admissionSemester: admissionSemester?.name || "",
        academicDepartment: academicDepartment?.name || "",
        academicFaculty: academicFaculty?.name || "",
      })
    ) || [];

  const getUniqueValues = (key: keyof TStudentRow) =>
    Array.from(new Set(tableData.map((item) => item[key])))
      .filter((v): v is string => v !== undefined) // remove undefined
      .map((value) => ({
        text: String(value),
        value,
      }));

  console.log("StudentData:", tableData);
  const columns: TableColumnsType<TStudentRow> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Admission Semester",
      dataIndex: "admissionSemester",
      filters: getUniqueValues("admissionSemester"),
      onFilter: (value, record) => record.admissionSemester === value,
    },
    {
      title: "Profile Image",
      dataIndex: "profileImage",
      render: (url) =>
        url ? <img src={url} alt="profile" width={50} /> : "N/A",
    },
    {
      title: "Academic Department",
      dataIndex: "academicDepartment",
      filters: getUniqueValues("academicDepartment"),
      onFilter: (value, record) => record.academicDepartment === value,
    },
    {
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
      filters: getUniqueValues("academicFaculty"),
      onFilter: (value, record) => record.academicFaculty === value,
    },
  ];

  const onChange: TableProps<TStudentRow>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = Object.entries(filters).flatMap(
        ([key, values]) =>
          (values as string[] | undefined)?.map((v) => ({
            name: key,
            value: String(v),
          })) || []
      );

      setParams(queryParams);
    }
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
      <div className="text-2xl font-bold text-center">Student Intro</div>
      <Table<TStudentRow>
        rowKey="_id"
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </>
  );
};

export default StudentIntro;
