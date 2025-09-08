import { Table, type TableColumnsType } from "antd";
import { useGetAllAcademicFacultyQuery } from "../../../../redux/features/admin/AcademicManagementApi";
import type { TAcademicFaculty } from "./academicFaculty.type";

const academicFaculty = () => {
  const { data: facultyData, isFetching } =
    useGetAllAcademicFacultyQuery(undefined);

  const tableData = facultyData?.data?.map(
    ({ _id, name }: TAcademicFaculty) => ({
      _id,
      name,
    })
  );

  const columns: TableColumnsType<TAcademicFaculty> = [
    {
      title: "Name",
      dataIndex: "name",
    },
  ];

  return (
    <>
      <div className="text-2xl font-bold text-center">
        Academic Faculty Name
      </div>
      <Table<TAcademicFaculty>
        rowKey="_id"
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </>
  );
};

export default academicFaculty;
