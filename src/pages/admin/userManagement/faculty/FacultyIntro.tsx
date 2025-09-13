import {
  Button,
  Pagination,
  Table,
  type TableColumnsType,
  type TableProps,
} from "antd";
import { useState } from "react";
import { useGetAllFacultyQuery } from "../../../../redux/features/admin/userManagementApi";
import type { TQueryParam } from "../../academicManagement/academicManagement.type";
import type { TFacultyRow } from "./faculty.type";
import FacultyIntroModal from "./FacultyIntroModel";

const FacultyIntro = () => {
  const [page, setPage] = useState<number>(1);
  const [params, setParams] = useState<TQueryParam[]>([]);

  // modal state
  const [open, setOpen] = useState(false);
  const [faculty, setFaculty] = useState<TFacultyRow>();

  const { data: facultyData, isFetching } = useGetAllFacultyQuery([
    { name: "limit", value: "5" },
    { name: "page", value: String(page) },
    ...params,
  ]);

  const meteData = facultyData?.meta;
  const tableData: TFacultyRow[] =
    facultyData?.data?.map(
      ({
        _id,
        id,
        name,
        designation,
        profileImage,
        academicDepartment,
        email,
        contactNo,
        emergencyContactNo,
        gender,
        dateOfBirth,
        bloodGroup,
        permanentAddress,
        presentAddress,
      }) => ({
        email,
        id,
        _id,
        contactNo,
        emergencyContactNo,
        designation,
        gender,
        dateOfBirth,
        bloodGroup,
        permanentAddress,
        presentAddress,
        name: `${name?.firstName} ${name?.middleName || ""} ${
          name?.lastName || ""
        }`.trim(),
        profileImage: profileImage || "",
        academicDepartment: academicDepartment?.name || "",
      })
    ) || [];

  const getUniqueValues = (key: keyof TFacultyRow) =>
    Array.from(new Set(tableData.map((item) => item[key])))
      .filter((v): v is string => v !== undefined)
      .map((value) => ({
        text: String(value),
        value,
      }));

  const handleOpen = (record: TFacultyRow) => {
    setFaculty(record);
    setOpen(true);
  };

  const columns: TableColumnsType<TFacultyRow> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: getUniqueValues("name"),
      onFilter: (value, record) => record.name === value,
    },
    {
      title: "Designation",
      dataIndex: "designation",
      filters: getUniqueValues("designation"),
      onFilter: (value, record) => record.designation === value,
    },
    {
      title: "Academic Department",
      dataIndex: "academicDepartment",
      filters: getUniqueValues("academicDepartment"),
      onFilter: (value, record) => record.academicDepartment === value,
    },
    {
      title: "Profile Image",
      dataIndex: "profileImage",
      render: (url) => (url ? <img src={url} alt="Img" width={50} /> : "N/A"),
    },
    {
      title: "Action",
      render: (_, record) => {
        console.log({ record });
        return (
          <div>
            <Button onClick={() => handleOpen(record)}>Details</Button>
            <Button className="">Update</Button>
            <Button className="">Delete</Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TFacultyRow>["onChange"] = (
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
      setPage(1);
    }
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
      <div className="text-2xl font-bold text-center">Student Intro</div>
      <Table<TFacultyRow>
        rowKey="_id"
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
      />
      <Pagination
        style={{ marginTop: "12px" }}
        pageSize={meteData?.limit}
        total={meteData?.total}
        current={page}
        onChange={(value) => setPage(value)}
      />
      <FacultyIntroModal
        open={open}
        onClose={() => setOpen(false)}
        faculty={faculty}
      />
    </>
  );
};

export default FacultyIntro;
