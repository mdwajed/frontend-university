import { Button, Table, type TableColumnsType, type TableProps } from "antd";
import { useState } from "react";
import { useGetAllAcademicDepartmentQuery } from "../../../../redux/features/admin/AcademicManagementApi";
import type { TQueryParam } from "../academicManagement.type";
import type { TAcademicDepaetment } from "./AcademicDepartment.type";

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const { data: departmentData, isFetching } =
    useGetAllAcademicDepartmentQuery(params);

  const tableData = departmentData?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      _id,
      name,
      academicFaculty,
    })
  );
  console.log("SemesterData:", tableData);
  const columns: TableColumnsType<TAcademicDepaetment> = [
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
      title: "Action",
      dataIndex: "endMonth",
      render: () => {
        return <Button>Update</Button>;
      },
    },
  ];

  const onChange: TableProps<TAcademicDepaetment>["onChange"] = (
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
      <Table<TAcademicDepaetment>
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
