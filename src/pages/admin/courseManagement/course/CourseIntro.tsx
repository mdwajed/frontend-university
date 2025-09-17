import {
  Button,
  Pagination,
  Table,
  type TableColumnsType,
  type TableProps,
} from "antd";
import { useState } from "react";
import { useGetAllCoursesQuery } from "../../../../redux/features/admin/AcademicManagementApi";
import type { TQueryParam } from "../../academicManagement/academicManagement.type";
import AddCourse from "./AddFacultyModal";
import type { ICourse } from "./course.type";
import CourseIntroModal from "./CourseModal";

const CourseIntro = () => {
  const [page, setPage] = useState<number>(1);
  const [params, setParams] = useState<TQueryParam[]>([]);

  //course modal state
  const [openDetails, setOpenDetails] = useState(false);
  const [course, setCourse] = useState<ICourse>();

  //course modal state
  const [openAddFaculty, setOpenAddFaculty] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const { data: courseData, isFetching } = useGetAllCoursesQuery([
    { name: "limit", value: "5" },
    { name: "page", value: String(page) },
    ...params,
  ]);

  const meteData = courseData?.meta;
  const tableData: ICourse[] =
    courseData?.data?.map(
      ({ _id, title, prefix, code, credits, preRequisiteCourses }) => ({
        _id,
        title,
        prefix,
        code,
        credits,
        preRequisiteCourses,
      })
    ) || [];

  const getUniqueValues = (key: keyof ICourse) =>
    Array.from(new Set(tableData.map((item) => item[key])))
      .filter((v): v is string => v !== undefined)
      .map((value) => ({
        text: String(value),
        value,
      }));

  const handleDetailsOpen = (record: ICourse) => {
    setCourse(record);
    setOpenDetails(true);
  };
  const handleAddFacultyOpen = (record: ICourse) => {
    setSelectedCourseId(record._id);
    setOpenAddFaculty(true);
  };

  const columns: TableColumnsType<ICourse> = [
    {
      title: "Course Name",
      dataIndex: "title",
      filters: getUniqueValues("title"),
      onFilter: (value, record) => record.title === value,
    },
    {
      title: "Prefix",
      dataIndex: "prefix",
      filters: getUniqueValues("prefix"),
      onFilter: (value, record) => record.prefix === value,
    },
    {
      title: "Code",
      dataIndex: "code",
      filters: getUniqueValues("code"),
      onFilter: (value, record) => record.code === value,
    },
    {
      title: "Credits",
      dataIndex: "credits",
      filters: getUniqueValues("credits"),
      onFilter: (value, record) => record.credits === value,
    },
    {
      title: "Action",
      render: (_, record) => {
        console.log({ record });
        return (
          <div>
            <Button onClick={() => handleDetailsOpen(record)}>Details</Button>
            <Button onClick={() => handleAddFacultyOpen(record)}>
              Add Faculty
            </Button>

            {/* <Button className="">Delete</Button>  */}
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<ICourse>["onChange"] = (
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
      <Table<ICourse>
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
      <CourseIntroModal
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        course={course}
      />
      <AddCourse
        open={openAddFaculty}
        onClose={() => setOpenAddFaculty(false)}
        courseId={selectedCourseId}
      />
    </>
  );
};

export default CourseIntro;
