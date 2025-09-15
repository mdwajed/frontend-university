import {
  Dropdown,
  message,
  Pagination,
  Space,
  Table,
  Tag,
  type MenuProps,
  type TableColumnsType,
  type TableProps,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import {
  useGetAllRegisteredSemesterQuery,
  useUpdateRegisteredSemesterStatusMutation,
} from "../../../../redux/features/admin/AcademicManagementApi";
import type { TQueryParam } from "../../academicManagement/academicManagement.type";
import type { TRegisteredSemesterRow } from "./semesterRegistration.type";

const RegisteredSemester = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState<number>(1);

  // ✅ Setup message instance
  const [messageApi, contextHolder] = message.useMessage();

  const { data: semesterData, isFetching } =
    useGetAllRegisteredSemesterQuery(params);

  const [updateRegisteredSemesterStatus] =
    useUpdateRegisteredSemesterStatusMutation();

  const metaData = semesterData?.meta;

  const tableData: TRegisteredSemesterRow[] =
    semesterData?.data?.map(
      ({
        _id,
        academicSemester,
        status,
        startDate,
        endDate,
        minCredit,
        maxCredit,
      }) => ({
        _id,
        semesterName: academicSemester?.name,
        status,
        startDate,
        endDate,
        minCredit,
        maxCredit,
      })
    ) ?? [];
  console.log("SemesterData:", tableData);

  const handleUpdateStatus = async (_id: string, status: string) => {
    try {
      const updatedSemester = await updateRegisteredSemesterStatus({
        _id,
        status,
      }).unwrap();
      console.log("Update response:", updatedSemester);
      messageApi.open({
        type: "success",
        content: `Semester status updated to ${status}`,
      });
      return updatedSemester;
    } catch (error) {
      console.error("Update failed:", error);
      messageApi.open({
        type: "error",
        content: "Failed to update semester status",
      });
    }
  };

  const getUniqueValues = (key: keyof TRegisteredSemesterRow) =>
    Array.from(new Set(tableData.map((item) => item[key])))
      .filter((v): v is string => v !== undefined)
      .map((value) => ({
        text: String(value),
        value,
      }));

  const columns: TableColumnsType<TRegisteredSemesterRow> = [
    {
      title: " Semester",
      dataIndex: "semesterName",
      filters: getUniqueValues("semesterName"),
      onFilter: (value, record) => record.semesterName === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: getUniqueValues("status"),
      onFilter: (value, record) => record.status === value,
      render: (status: string) => {
        let color;
        if (status === "UPCOMING") {
          color = "blue";
        }
        if (status === "ONGOING") {
          color = "green";
        }
        if (status === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: (date: string) => dayjs(date).format("MMMM"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: (date: string) => dayjs(date).format("MMMM"),
    },
    {
      title: "Min Credit",
      dataIndex: "minCredit",
    },
    {
      title: "Max Credit",
      dataIndex: "maxCredit",
    },
    {
      title: "Action",
      dataIndex: "endDate",
      render: (_, record) => {
        const items: MenuProps["items"] = [
          {
            key: "UPCOMING",
            label: "UPCOMING",
            onClick: () => handleUpdateStatus(record._id, "UPCOMING"),
          },
          {
            type: "divider",
          },
          {
            key: "ONGOING",
            label: "ONGOING",
            onClick: () => handleUpdateStatus(record._id, "ONGOING"),
          },
          {
            key: "ENDED",
            label: "ENDED",
            onClick: () => handleUpdateStatus(record._id, "ENDED"),
          },
        ];
        return (
          <div>
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>Update</Space>
              </a>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TRegisteredSemesterRow>["onChange"] = (
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
      {contextHolder}
      <div className="text-2xl font-bold text-center">
        Academic Semester Intro
      </div>
      <Table<TRegisteredSemesterRow>
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
        pageSize={metaData?.limit}
        total={metaData?.total}
        current={page}
        onChange={(value) => setPage(value)}
      />
    </>
  );
};

export default RegisteredSemester;
