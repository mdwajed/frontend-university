import { Button, Table, type TableColumnsType, type TableProps } from "antd";
import { useState } from "react";
import { useGetAllAcademicSemesterQuery } from "../../../../redux/features/admin/AcademicManagementApi";
import type { TQueryParam } from "../academicManagement.type";
import type { TAcademicSemester } from "./academicSemester.constant";

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const { data: semesterData, isFetching } =
    useGetAllAcademicSemesterQuery(params);

  const tableData = semesterData?.data?.map(
    ({ _id, academicYear, name, startMonth, endMonth }) => ({
      _id,
      academicYear,
      name,
      startMonth,
      endMonth,
    })
  );
  console.log("SemesterData:", tableData);
  const columns: TableColumnsType<TAcademicSemester> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Fall",
          value: "Fall",
        },
      ],
    },
    {
      title: "Academic Year",
      dataIndex: "academicYear",
      filters: [
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
        {
          text: "2027",
          value: "2027",
        },
      ],
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
    {
      title: "Action",
      dataIndex: "endMonth",
      render: () => {
        return <Button>Update</Button>;
      },
    },
  ];

  const onChange: TableProps<TAcademicSemester>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [
        ...(filters.name?.map((item) => ({
          name: "name",
          value: String(item),
        })) || []),
        ...(filters.academicYear?.map((item) => ({
          name: "academicYear",
          value: String(item),
        })) || []),
      ];
      setParams(queryParams);
    }
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
      <div className="text-2xl font-bold text-center">
        Academic Semester Intro
      </div>
      <Table<TAcademicSemester>
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

export default AcademicSemester;
